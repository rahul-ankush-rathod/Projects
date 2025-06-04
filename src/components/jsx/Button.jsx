import React from "react";
import '../css/Button.css';

const Button = ({ onClick, isLoading }) => {
  return (
    <button className="button" onClick={onClick} disabled={isLoading}>
      {isLoading ? "Processing..." : "Generate/Debug"}
    </button>
  );
};

export default Button;
