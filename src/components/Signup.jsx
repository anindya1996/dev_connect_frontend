import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import { Link } from "react-router-dom";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(
        `${BASE_URL}/signup`,
        {
          firstName,
          lastName,
          email,
          password,
          gender,
          age,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      navigate("/login");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <>
      <div className="flex justify-center my-12">
        <div className="card bg-[#3c3c3c] w-96 shadow-xl ">
          <div className="card-body">
            <h2 className="card-title text-white justify-center">
              Signup Here
            </h2>
            <form className="m-4">
              <div>
                <div className="mb-2">
                  <input
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    type="text"
                    placeholder="Enter your first name"
                    className="input input-bordered w-full max-w-xs"
                  />
                </div>
                <div className="mb-2">
                  <input
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    type="text"
                    placeholder="Enter your last name"
                    className="input input-bordered w-full max-w-xs"
                  />
                </div>
                <div className="mb-2">
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="email"
                    placeholder="Enter your email"
                    className="input input-bordered w-full max-w-xs"
                  />
                </div>
                <div className="mb-2">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    placeholder="Enter your password"
                    className="input input-bordered w-full max-w-xs"
                  />
                </div>
                <div className="mb-2">
                  <input
                    onChange={(e) => setAge(e.target.value)}
                    value={age}
                    type="number"
                    placeholder="Enter your age"
                    className="input input-bordered w-full max-w-xs"
                  />
                </div>
                <div className="mb-2">
                  <input
                    onChange={(e) => setGender(e.target.value)}
                    value={gender}
                    type="text"
                    placeholder="Enter your gender"
                    className="input input-bordered w-full max-w-xs"
                  />
                </div>
              </div>
              <p className="text-red-500 text-center">{error}</p>
              <h3 className="text-white text-center">
                Alredy signed up?
                <span className="text-green-400 font-bold">
                  <Link to={"/login"}> Login</Link>
                </span>
              </h3>
              <div className="text-center mt-4">
                <button onClick={handleSignup} className="btn  btn-primary">
                  Signup
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
