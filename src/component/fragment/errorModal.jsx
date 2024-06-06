import React from "react";

const ErrorModal = ({ isError, message, setIsError }) => {
  if (!isError) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg overflow-hidden shadow-lg w-11/12 md:w-1/3">
        <div className="p-4 relative">
          <div className="flex flex-col items-center">
            <p className="text-gray-700 mb-4">{message}</p>
            <button
              onClick={() => (setIsError(false))}
              className="bg-gray-800 text-white px-6 py-2 rounded-lg"
            >
              Baik
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
