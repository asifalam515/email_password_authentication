import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import app from "../../firebase/firebase.config";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { useState } from "react";
import { Link } from "react-router-dom";
const Register = () => {
  const [registerError, setRegisterError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // event handler
  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const name = e.target.name.value;
    const password = e.target.password.value;
    const accepted = e.target.terms.checked;

    // reset messages
    setRegisterError("");
    setSuccess("");
    if (password.length < 6) {
      setRegisterError("Password should be atleast 6 character");
      // if its happen it will not go further
      return;
    } else if (!/[A-Z]/.test(password)) {
      setRegisterError("Your password should have atleast one uppercase");
      return;
    } else if (!accepted) {
      setRegisterError("Please accepts Terms and Condition");
      return;
    }

    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedInUser = result.user;
        console.log(loggedInUser);
        setSuccess("user created successfully");
        // update user profile
        updateProfile(result.user, {
          displayName: name,
          photoURL:
            "https://media.gettyimages.com/id/1711546167/photo/guwahati-india-shakib-al-hasan-of-bangladesh-poses-for-a-portrait-ahead-of-the-icc-mens.jpg?s=612x612&w=gi&k=20&c=58OYvHser3EhyvI8QUKnKVrGnMivmazsS8RoEjvm0fc=",
        }).then(() => {
          console.log("profile updated");
        });
        // send verification email
        sendEmailVerification(loggedInUser).then(() => {
          alert("Please check Your email and verify it now!!");
        });
      })
      .catch((error) => {
        console.log(error);
        setRegisterError(error.message);
      });
  };
  return (
    <div className="mx-auto">
      <div className="mx-auto md:w-1/2">
        <h1 className="text-2xl p-2"> Please Register</h1>
        <form onSubmit={handleRegister} action="" className="">
          <input
            placeholder="Your Email Address"
            className="mb-4 w-full p-2"
            type="email"
            name="email"
          />
          <br />
          <input
            placeholder="Your Name Please"
            className="mb-4 w-full p-2"
            type="text"
            name="name"
          />
          <br />
          <div className="relative">
            <input
              placeholder="Enter password"
              className="mb-4 w-full p-2"
              type={showPassword ? "text" : "password"}
              name="password"
              id=""
            />
            <span
              className="absolute top-3 right-2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
            </span>
          </div>
          <br />
          <div className="mb-2">
            <input type="checkbox" name="terms" id="terms" />
            <label className="ml-2 mb-4" htmlFor="terms">
              Accept Our <a href="">Terms</a> and Conditions
            </label>
          </div>
          <br />

          <input
            className="mb-4 w-full btn btn-success"
            type="submit"
            value="register"
          />
        </form>
        {registerError && <p className="text-red-700"> {registerError} </p>}
        {success && <p className="text-green-700">{success}</p>}
      </div>
      <div>
        <h1>
          Already Have an Account ? Please <Link to="/login">Log in</Link>{" "}
        </h1>
      </div>
    </div>
  );
};

export default Register;
