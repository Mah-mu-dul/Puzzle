import React from "react";

const UserCard = ({ user }) => (
  <div className="flex items-center gap-4 mb-6 bg-blue-50 rounded-lg p-3 shadow">
    <img
      src={user.photo}
      alt="user"
      className="w-12 h-12 rounded-full border-2 border-blue-200"
    />
    <div>
      <div className="font-semibold text-lg">{user.name}</div>
      <div className="text-xs text-gray-500">{user.email}</div>
    </div>
  </div>
);

export default UserCard;
