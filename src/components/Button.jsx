import React from 'react';

function Button({ type, onClick }) {
  const handleOnClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button onClick={handleOnClick}>
      {type === 'add' && (
        <div className="bg-blue-100 hover:bg-cyan-400 duration-300 px-3 py-2 rounded-md cursor-pointer ml-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </div>
      )}
      {type === 'delete' && (
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </div>
      )}
    </button>
  );
}

export default Button;
