import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import app from "../../firebase/firebase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const LogIn = () => {
  const [loginMessage, setLoginMessage] = useState("");
  const [loginError, setLoginError] = useState("");
  const emailRef = useRef(null);

  // even handlers
  const handleResetPassword = () => {
    const auth = getAuth(app);
    const email = emailRef.current.value;
    if (!email) {
      console.log("Please provide an email", emailRef.current.value);
      return;
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      console.log("Please Write a valid email");
      return;
    }
    // send validation email
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Please check your email");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLogIn = (e) => {
    e.preventDefault();
    setLoginMessage("");
    setLoginError("");
    const email = e.target.email.value;
    const password = e.target.password.value;
    // we can add validation here

    // working for login

    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setLoginMessage("User Logged In successfully");
        console.log(result.user);
        if (result.user.emailVerified) {
          setLoginMessage("Your Email is Verified");
        } else {
          alert("Please Verify your email address");
        }
      })
      .catch((error) => {
        console.log(error);
        setLoginError("Error Happen", error.message);
      });
  };
  return (
    <div>
      <h2 className="text-2xl">Please Logged In</h2>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body" onSubmit={handleLogIn}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  ref={emailRef}
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  name="password"
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <a
                    onClick={handleResetPassword}
                    href="#"
                    className="label-text-alt link link-hover"
                  >
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
            <div>
              {loginError && (
                <h1 className="text-3xl bg-red-700"> {loginError} </h1>
              )}
            </div>
            <div>
              {loginMessage && (
                <h1 className="text-3xl bg-green-800"> {loginMessage} </h1>
              )}
            </div>
            <div>
              <div>
                <h1>
                  Don't have Account ?<Link to="/register">Register Here</Link>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
