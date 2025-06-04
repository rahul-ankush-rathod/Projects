import React, { useState } from "react";
import TextArea from "./components/jsx/TextArea";
import Button from "./components/jsx/Button";
import ResultBox from "./components/jsx/ResultBox";
import Navbar from "./components/jsx/Navbar";
import Sidepart from "./components/jsx/Sidepart";
import { ClipLoader } from "react-spinners";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/jsx/About";
import "./App.css"; // ✅ Ensure global styles are imported

const App = () => {
  const [userInput, setUserInput] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const apiKey = process.env.REACT_APP_OPENROUTER_API_KEY; // ✅ Store API key from .env

  // Function to handle API request
  const handleSubmit = async () => {
    if (!userInput.trim()) {
      setResult("Error: Input cannot be empty.");
      return;
    }

    setIsLoading(true); // Start loading
    


    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`, // ✅ Use stored API key
        },
        body: JSON.stringify({
          model: "meta-llama/llama-3.3-70b-instruct:free",
          messages: [{ role: "user", content: userInput }],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `HTTP Error: ${response.status}`);
      }

      const data = await response.json();
      displayTypingEffect(data.choices?.[0]?.message?.content.trim() || "No response from AI.");
    } catch (error) {
      setResult(`Error: ${error.message}`);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  // Typing effect function
  const displayTypingEffect = (text) => {
    const cleanedText = text.replace(/\*/g, ""); // ✅ Removes all '*' from the response
    setResult(""); // Reset previous result
    let i = -1;

    const type = () => {
      if (i < cleanedText.length) {
        setResult((prev) => prev + cleanedText.charAt(i));
        i++;
        setTimeout(type, 10); // Typing speed
      }
    };

    type();
  };

  return (
    <div className="app">
       <Router>
       <Navbar />
      <Routes>
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
      <h1>AI Code Generator</h1>
      <br />
     
      <div className="body-part">
        <div className="resultbox">
          <ResultBox result={result} />
        </div>
      </div>
      <div className="textbtn">
        <TextArea userInput={userInput} setUserInput={setUserInput} handleSubmit={handleSubmit} />
        <Button onClick={handleSubmit} isLoading={isLoading} />
      </div>
      {isLoading && (
        <div className="loading-indicator">
          <ClipLoader color="#36d7b7" size={35} />
        </div>
      )}
    </div>
  );
};

export default App;
