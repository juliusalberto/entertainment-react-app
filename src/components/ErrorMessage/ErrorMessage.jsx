import React from 'react';

const ErrorMessage = ({ message }) => {
  return (
    <div className="bg-red-500 text-white px-4 py-3 rounded-md mb-4 font-outfit">
      <p className="text-sm">
        <span className="font-medium">Error:</span> {message}
      </p>
    </div>
  );
};

export default ErrorMessage;