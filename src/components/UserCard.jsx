import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, gender, age, photoUrl, skills, about } =
    user;

  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.log(`ERROR: ${err.message}`);
    }
  };

  return (
    <>
      <div className="card bg-[#3c3c3c] text-white w-96 shadow-xl h-[24rem] overflow-hidden">
        <figure className="mt-5 flex justify-center">
          <img
            className="w-24 mt-6 h-24 rounded-full object-cover"
            src={photoUrl}
            alt="User"
          />
        </figure>
        <div className="flex flex-col justify-center items-center m-6">
          <h2 className="my-2 font-semibold">
            {`${firstName} ${lastName} (${age}) ${gender
              .charAt(0)
              .toUpperCase()}${gender.slice(1)}`}
          </h2>
          <p className="my-2">{about}</p>
          <p className="my-2 font-semibold break-words">
            {" "}
            {Array.isArray(skills) ? skills.join(", ") : skills}
          </p>
          <div className="card-actions justify-center my-4">
            <button
              onClick={() => handleSendRequest("interested", _id)}
              className="btn btn-primary mr-6"
            >
              Interested
            </button>
            <button
              onClick={() => handleSendRequest("ignored", _id)}
              className="btn btn-secondary"
            >
              Ignore
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;
