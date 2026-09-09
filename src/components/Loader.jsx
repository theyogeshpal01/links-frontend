import React from 'react';

const Loader = ({ fullScreen = false }) => {
  const containerClass = fullScreen 
    ? "fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#f4f6f9] bg-opacity-80 backdrop-blur-sm"
    : "flex flex-col items-center justify-center p-12 w-full h-full min-h-[200px]";

  return (
    <div className={containerClass}>
      <div className="flex space-x-2 mb-4">
        <div className="w-4 h-4 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
      <p className="text-gray-500 font-medium text-sm animate-pulse tracking-widest uppercase">Loading...</p>
    </div>
  );
};

export default Loader;
