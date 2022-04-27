import axios from "axios";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useLocation, useNavigate } from "react-router-dom";
import auth from "../../../firebase/firebase.init";
const Login = () => {
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const [user,loading,error] = useAuthState(auth)
  const navigate = useNavigate()
  const handleGoogleSignIn = () => {
    signInWithGoogle();
  };
  const location = useLocation()
  console.log(location)
  const from = location?.state?.from?.pathname || '/'
  if(user){
    const handleToken = () => {
      const email = {email: user.email}
      axios.post('http://localhost:5000/login',email)
      .then(response => {
        const {accessToken} = response.data
        localStorage.setItem("accessToken",accessToken)
        navigate(from,{replace: true})
      })
    } 
    handleToken()
  }
  return (
    <div className="min-vh-100 container">
      <form className="mx-auto my-5 w-75">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <button
        onClick={handleGoogleSignIn}
        className="btn btn-warning px-5 d-block mx-auto my-4"
      >
        Google sign in
      </button>
    </div>
  );
};

export default Login;
