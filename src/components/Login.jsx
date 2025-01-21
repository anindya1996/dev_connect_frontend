import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("@gmail.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(
        `${BASE_URL}/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));

      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <>
      <div className="flex justify-center my-12">
        <div className="card bg-[#3c3c3c] w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-white justify-center">Login Here</h2>
            <form className="m-4 ">
              <label className="input input-bordered flex items-center gap-2 m-2 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input
                  onChange={handleEmail}
                  type="text"
                  value={email}
                  className="grow"
                  placeholder="Email"
                />
              </label>

              <label className="input input-bordered flex items-center gap-2 m-2 mt-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  onChange={handlePassword}
                  type="password"
                  value={password}
                  className="grow"
                  placeholder="Password"
                />
              </label>
              <p className="text-red-500 p-2">{error}</p>
              <h3 className="text-white text-center">
                New user?
                <span className="text-green-300">
                  <Link to="/signup"> Signup</Link>
                </span>
              </h3>
              <div className="card-actions justify-center p-2">
                <button
                  onClick={handleLogin}
                  className="btn btn-accent mt-4 p-4 px-6 font-bold"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
