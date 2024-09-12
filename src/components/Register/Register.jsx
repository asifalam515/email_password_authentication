import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "../../firebase/firebase.config";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { useState } from "react";
const Register = () => {
  const [registerError, setRegisterError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
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
    }

    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedInUser = result.user;
        console.log(loggedInUser);
        setSuccess("user created successfully");
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
            id=""
          />
          <br />
          <input
            placeholder="Enter password"
            className="mb-4 w-full p-2"
            type={showPassword ? "text" : "password"}
            name="password"
            id=""
          />
          <span onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
          </span>
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
    </div>
  );
};

export default Register;
