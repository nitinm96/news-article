import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/articleLogo.png";

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5001/api/users/register",
        { username, password },
        {
          headers: { "Content-Type": "application/json" }, // Optional if your API expects JSON by default
        }
      );
      console.log(response.data);
      alert("User registered successfully");
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="flex flex-col items-center justify-center">
        <form onSubmit={handleRegister}>
          <div className="flex flex-col justify-center items-center bg-white rounded-xl p-20 space-y-4 shadow-2xl">
            <img src={Logo} alt="logo" width={300} />

            <h1 className="text-3xl">Sign up for your account!</h1>
            <div className="flex items-center justify-between">
              <p>Already have an account? </p>
              <Link to="/login" className="underline pl-2">
                Sign In
              </Link>
            </div>
            <input
              className="border-2 border-black p-2 m-2 rounded-lg w-full"
              type="text"
              name="username"
              placeholder="Username"
              required
              minLength={5}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="border-2 border-black p-2 m-2 rounded-lg w-full"
              type="password"
              name="password"
              placeholder="Password"
              minLength={5}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="bg-cyan-500 text-white rounded-lg text-xl px-10 py-2 m-2"
              type="submit"
            >
              Register
            </button>
            <Link to="/home" className="underline">
              Continue without an account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
