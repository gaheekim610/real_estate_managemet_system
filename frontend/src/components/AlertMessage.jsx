import React from "react";

const styles = {
  info: "bg-gray-600",
  success: "bg-blue-600",
  error: "bg-red-600",
};

const AlertMessage = ({ type = "info", message, onClose }) => {
  const bgColor = styles[type] || styles.info;

  return (
    <div
      role="alert"
      className={`inline-flex items-center p-3 text-sm text-white ${bgColor} rounded-md shadow-md`}
    >
      <span>
        {Array.isArray(message)
          ? message.map((line, index) => <div key={index}>{line}</div>)
          : message}
      </span>
      <button
        class="flex items-center justify-center transition-all w-8 h-8 rounded-md text-white hover:bg-white/10 active:bg-white/10 absolute top-1.5 right-1.5"
        type="button"
        onClick={onClose}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="h-5 w-5"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default AlertMessage;
