import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism"; // Choose a theme

const ResultBox = ({ result }) => {
  return (
    <SyntaxHighlighter language="javascript" style={dracula}>
      {result}
    </SyntaxHighlighter>
  );
};

export default ResultBox;
