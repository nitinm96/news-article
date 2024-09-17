import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/articleLogo.png";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errState, setErrState] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5001/api/users/login",
        { username, password },
        {
          headers: { "Content-Type": "application/json" }, // Optional if your API expects JSON by default
        }
      );
      const token = response.data.accessToken;
      localStorage.setItem("accessToken", token);

      console.log(response.data);
      setErrState(false);
      navigate("/home");
      window.location.reload();
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data);
        setErrState(true);
        setErrorMessage(err.response.data.error);
      } else {
        console.error("Unexpected Error:", err); // Log unexpected errors
      }
    }
  };
  return (
    <div>
      <div className="flex justify-center items-center h-screen ">
        <div className="flex flex-col items-center justify-center">
          <form onSubmit={handleLogin}>
            <div className="flex flex-col justify-center items-center bg-white rounded-xl p-20 space-y-4 shadow-2xl">
              <img src={Logo} alt="logo" width={300} />
              <h1 className="text-3xl">Welcome, Sign in to your account!</h1>
              <div className="flex items-center justify-between">
                <p>Don't have an account? </p>
                <Link to="/register" className="underline pl-2">
                  Register
                </Link>
              </div>
              <input
                className="border-2 border-black p-2 m-2 rounded-lg w-3/4"
                type="text"
                name="username"
                placeholder="Username"
                required
                minLength={5}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                className="border-2 border-black p-2 m-2 rounded-lg w-3/4"
                type="password"
                name="password"
                placeholder="Password"
                minLength={5}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              {errState && <div className="text-red-500">{errorMessage}</div>}
              <button
                className="bg-cyan-500 text-white rounded-lg text-xl px-10 py-2 m-2"
                type="submit"
              >
                Login
              </button>
              <Link to="/home" className="underline">
                Continue without an account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
