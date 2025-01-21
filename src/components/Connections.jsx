import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);

  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0)
    return (
      <h1 className="flex justify-center font-semibold my-10">
        No Connections Found!!
      </h1>
    );

  return (
    <div className=" text-center my-10 mb-16">
      <h1 className="font-bold text-4xl mb-8">Connections</h1>

      {connections.map((connection) => {
        const {
          _id,
          firstName,
          lastName,
          age,
          about,
          gender,
          photoUrl,
          skills,
        } = connection;
        return (
          <div
            className="flex justify-around items-center m-auto w-[72%] p-4 my-4  bg-gray-700 text-white rounded-lg"
            key={_id}
          >
            <div className="w-[20%] ml-3">
              <img
                className="w-20 h-20 object-cover rounded-full"
                alt="photo"
                src={photoUrl}
              />
            </div>

            <div className="text-left mx-4 ml-8 w-[60%]">
              <h2 className="font-bold text-xl">{`${firstName} ${lastName}`}</h2>
              {age && gender && (
                <p className="font-medium">{`${age} (${gender
                  .charAt(0)
                  .toUpperCase()}${gender.slice(1)})`}</p>
              )}{" "}
              <p>{about}</p>
              <p className="font-semibold">{skills.join(", ")}</p>
            </div>
            <div className="w-[20%]">
              <button className="btn btn-primary">Chat</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
