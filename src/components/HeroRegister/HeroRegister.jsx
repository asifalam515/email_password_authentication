import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import app from "../../firebase/firebase.config";

const HeroRegister = () => {
  const [registerError, setRegisterError] = useState("");
  const [message, setMessage] = useState("");
  const handleRegister = (e) => {
    e.preventDefault();
    setRegisterError("");
    setMessage("");
    const email = e.target.email.value;
    const password = e.target.password.value;
    if (password.length < 6) {
      setRegisterError("too weak password");
      return;
    }
    console.log(email, password);
    const auth = getAuth(app);
    // cerate user
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedInUser = result.user;
        setMessage("User Created");
        console.log(loggedInUser);
      })
      .catch((error) => {
        console.log(error);
        setRegisterError(error.message);
      });
  };
  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body" onSubmit={handleRegister}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  name="email"
                  type="email"
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
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {registerError && (
        <h1 className="text-red-700 text-3xl">{registerError}</h1>
      )}
      {message && <h1 className="text-green-500 text-2xl">{message}</h1>}
    </div>
  );
};

export default HeroRegister;
