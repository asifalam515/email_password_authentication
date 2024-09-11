import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "../../firebase/firebase.config";
const Register = () => {
  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedInUser = result.user;
        console.log(loggedInUser);
      })
      .catch((error) => {
        console.log(error);
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
            type="password"
            name="password"
            id=""
          />
          <br />
          <input
            className="mb-4 w-full btn btn-success"
            type="submit"
            value="register"
          />
        </form>
      </div>
    </div>
  );
};

export default Register;
