import React from "react";
import zxcvbn from "zxcvbn";

const PasswordStrengthChecker = ({ password }) => {
  const result = zxcvbn(password);
  const strength = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
  const scoreColor = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-blue-500",
    "bg-green-500",
  ];

  const strengthIndicatorWidth = (result.score / 4) * 100 + "%";

  return (
    <div className="mt-2">
      <div className="w-full bg-gray-200 rounded h-2">
        <div
          className={`h-full rounded ${scoreColor[result.score]}`}
          style={{ width: strengthIndicatorWidth }}
        ></div>{" "}
      </div>{" "}
      <p className="text-sm text-gray-600 mt-1"> {strength[result.score]} </p>{" "}
    </div>
  );
};

export default PasswordStrengthChecker;
