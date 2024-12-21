import React, { useState } from "react";
import { AlgorithmData } from "../types/Algorithm";
import { analyzeComplexity } from "../utils/complexityAnalyzer";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism"; // Choose a theme

interface CodeInputProps {
  onAnalyze: (result: AlgorithmData) => void;
}

export const CodeInput: React.FC<CodeInputProps> = ({ onAnalyze }) => {
  const [code, setCode] = useState("");

  const handleAnalyze = () => {
    const result = analyzeComplexity(code);
    onAnalyze(result);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">Input Your Code</h3>
        <button
          onClick={handleAnalyze}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          Analyze
        </button>
      </div>
      {/* Use SyntaxHighlighter for code input */}
      {/* <SyntaxHighlighter language="javascript" style={atomDark}>
        {code}
      </SyntaxHighlighter> */}
      {/* <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        style={atomDark}
        className="w-full h-64 p-4 font-mono text-sm border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent mt-4"
        placeholder="Paste your code here..."
      /> */}
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        style={atomDark}
        className="w-full h-64 p-4 font-mono text-sm border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent mt-4"
        placeholder="Paste your code here..."
      >
        <SyntaxHighlighter language="javascript" style={atomDark}>
          {code}
        </SyntaxHighlighter>
      </textarea>
    </div>
  );
};

// import React, { useState } from 'react';
// import { AlgorithmData } from '../types/Algorithm';
// import { analyzeComplexity } from '../utils/complexityAnalyzer';

// interface CodeInputProps {
//   onAnalyze: (result: AlgorithmData) => void;
// }

// export const CodeInput: React.FC<CodeInputProps> = ({ onAnalyze }) => {
//   const [code, setCode] = useState('');

//   const handleAnalyze = () => {
//     const result = analyzeComplexity(code);
//     onAnalyze(result);
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
//       <div className="flex items-center justify-between mb-4">
//         <h3 className="text-xl font-semibold">Input Your Code</h3>
//         <button
//           onClick={handleAnalyze}
//           className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
//         >
//           Analyze
//         </button>
//       </div>
//       <textarea
//         value={code}
//         onChange={(e) => setCode(e.target.value)}
//         className="w-full h-64 p-4 font-mono text-sm border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//         placeholder="Paste your code here..."
//       />
//     </div>
//   );
// };
