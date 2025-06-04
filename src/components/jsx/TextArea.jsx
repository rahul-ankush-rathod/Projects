import React from "react";
import '../css/TextArea.css';

const TextArea = ({ userInput, setUserInput, handleSubmit }) => {
  return (
    <textarea
      className="textarea"
      value={userInput}
      onChange={(e) => setUserInput(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          handleSubmit();
        }
      }}
      placeholder="Enter your prompt here"
    />
  );
};

export default TextArea;
