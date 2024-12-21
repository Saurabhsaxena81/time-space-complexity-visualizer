import React from "react";
import { AlgorithmData } from "../types/Algorithm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism"; // You can change the theme

interface CodeEditorProps {
  algorithm: AlgorithmData;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ algorithm }) => {
  return (
    <div className="bg-gray-900 rounded-lg shadow-lg">
      <div className="border-b border-gray-700 p-4">
        <h3 className="text-white text-lg font-semibold">Implementation</h3>
      </div>
      <div className="p-6">
        <SyntaxHighlighter language="javascript" style={atomDark}>
          {/* Apply the theme */}
          {algorithm.code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

// import React from "react";
// import { AlgorithmData } from "../types/Algorithm";
// // import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// // import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
// interface CodeEditorProps {
//   algorithm: AlgorithmData;
// }

// export const CodeEditor: React.FC<CodeEditorProps> = ({ algorithm }) => {
//   return (
//     <div className="bg-gray-900 rounded-lg shadow-lg">
//       <div className="border-b border-gray-700 p-4">
//         <h3 className="text-white text-lg font-semibold">Implementation</h3>
//       </div>
//       <div className="p-6">
//         <pre className="text-gray-100 font-mono text-sm overflow-x-auto">
//           <code>{algorithm.code}</code>
//         </pre>
//       </div>
//     </div>
//   );
// };
