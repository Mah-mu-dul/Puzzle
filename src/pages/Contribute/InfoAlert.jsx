import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const InfoAlert = () => (
  <div className="mb-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 flex items-center gap-3 rounded-lg">
    <FaExclamationTriangle className="text-yellow-500 text-2xl" />
    <div>
      <div className="font-semibold">Help your juniors, stay authentic!</div>
      <div className="text-sm text-gray-700">
        Your contribution will help many students. Please upload only real,
        authentic questions. Fake or misleading uploads may be punishable.
        Admins can remove or block users.
      </div>
    </div>
  </div>
);

export default InfoAlert;
