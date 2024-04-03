import React from "react";

const Button = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px",
        margin: "10px",
        backgroundColor: "#007BFF",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
};

export default Button;
