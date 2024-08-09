import React from "react";

const getColorForMethod = (method) => {
  switch (method) {
    case "GET":
      return "blue";
    case "POST":
      return "bg-green-500";
    case "PUT":
      return "bg-yellow-500";
    case "DELETE":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

const Modal = ({ isOpen, onClose, details, route, method }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Request Details
        </h2>
        <div className="mb-4">
          <span className="font-bold">Route:</span> {route}
        </div>
        <div className="mb-4">
          <span className="font-bold">Method:</span>{" "}
          <span
            className={`px-2 py-1 rounded-full text-white ${getColorForMethod(
              method
            )}`}
          >
            {method}
          </span>
        </div>
        <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm text-gray-700">
          {JSON.stringify(details, null, 2)}
        </pre>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
