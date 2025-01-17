import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, gender, age, photoUrl, skills, about } = user;

  return (
    <>
      <div className="card bg-[#3c3c3c] text-white w-96 shadow-xl mb-12 mt-8 h-auto">
        <figure className="mt-5 ">
          <img src={photoUrl} alt="User" />
        </figure>
        <div className="card-body">
          <h2 className="card-title justify-center">
            {`${firstName} ${lastName} (${age}) ${gender
              .charAt(0)
              .toUpperCase()}${gender.slice(1)}`}
          </h2>
          <p className="flex justify-center">{about}</p>
          <p className="flex justify-center font-semibold">
            {skills?.join(", ")}
          </p>
          <div className="card-actions justify-center my-4">
            <button className="btn btn-primary mr-6">Accept</button>
            <button className="btn btn-secondary">Ignore</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;
