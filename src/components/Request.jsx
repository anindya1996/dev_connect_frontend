import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";

const Request = () => {
  const requests = useSelector((store) => store.requests);

  const dispatch = useDispatch();

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/received`, {
        withCredentials: true,
      });
      dispatch(addRequests(res?.data?.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  const reviewRequests = async (status, _id) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        {
          withCredentials: true,
        }
      );
    } catch (err) {
      console.log(`ERROR: ${err.message}`);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0)
    return <h1 className="flex justify-center my-10">No Requests Found!!</h1>;

  return (
    <div className=" text-center my-10 mb-16">
      <h1 className="font-bold text-4xl mb-8">Connection Requests</h1>

      {requests.map((request) => {
        const { _id, firstName, lastName, age, about, gender, photoUrl } =
          request.fromUserId;
        return (
          <div
            className="flex m-auto w-[70%] p-4 my-4  bg-gray-700 text-white rounded-lg justify-between items-center"
            key={_id}
          >
            <div>
              <img
                className="w-20 h-20 rounded-full"
                alt="photo"
                src={photoUrl}
              />
            </div>

            <div className="text-left mx-4 ml-8 ">
              <h2 className="font-bold text-xl">{`${firstName} ${lastName}`}</h2>
              {age && gender && (
                <p className="font-medium">{`${age} ${gender
                  .charAt(0)
                  .toUpperCase()}${gender.slice(1)}`}</p>
              )}{" "}
              <p>{about}</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <button className="btn btn-primary ">Accept</button>
              <button
                onClick={() => reviewRequests(status, _id)}
                className="btn btn-secondary px-[1.1rem] "
              >
                Reject
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Request;
