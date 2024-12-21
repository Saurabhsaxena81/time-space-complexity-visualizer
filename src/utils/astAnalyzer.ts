interface ASTNode {
  type: string;
  body?: ASTNode[];
  init?: any;
  test?: any;
  update?: any;
  consequent?: ASTNode;
  alternate?: ASTNode;
  declarations?: any[];
  memoryAllocations?: number; // Tracks memory allocations
}

export function parseCode(code: string): ASTNode {
  // Split the code into lines and trim whitespace
  const lines = code.split("\n").map((line) => line.trim());
  const ast: ASTNode = { type: "Program", body: [] };
  const stack: ASTNode[] = [ast];

  lines.forEach((line) => {
    const current = stack[stack.length - 1];

    // Detect `for` loops
    if (line.startsWith("for")) {
      const forNode: ASTNode = { type: "ForStatement", body: [] };
      current.body?.push(forNode);
      stack.push(forNode); // Push this node to track nesting
    }

    // Detect function declarations
    if (line.startsWith("function")) {
      const functionNode: ASTNode = { type: "FunctionDeclaration", body: [] };
      current.body?.push(functionNode);
      stack.push(functionNode); // Push this node to track nesting
    }

    // Detect memory allocations (e.g., arrays, objects)
    if (
      line.includes("Array.from") ||
      line.includes("Array(") ||
      line.includes("new")
    ) {
      current.body?.push({
        type: "MemoryAllocation",
        memoryAllocations: 1, // Mark this node for memory tracking
      });
    }

    // Detect end of a block (assumes closing braces indicate end)
    if (line === "}") {
      stack.pop();
    }
  });

  return ast;
}

export function analyzeAST(ast: ASTNode): {
  timeComplexity: { best: string; average: string; worst: string };
  spaceComplexity: string;
} {
  let maxNestedLoops = 0;
  let currentDepth = 0;
  let hasRecursion = false;
  let memoryAllocations = 0;

  // Dynamic traversal function
  function traverse(node: ASTNode) {
    if (node.type === "ForStatement") {
      currentDepth++;
      maxNestedLoops = Math.max(maxNestedLoops, currentDepth);
    }

    if (node.type === "FunctionDeclaration") {
      // Check for recursion: Does the function call itself?
      const functionName = node.init?.name || "";
      if (node.body) {
        const recursiveCall = node.body.find(
          (child) =>
            child.type === "FunctionCall" && child.init?.name === functionName
        );
        if (recursiveCall) {
          hasRecursion = true;
        }
      }
    }

    if (node.type === "MemoryAllocation") {
      memoryAllocations += node.memoryAllocations || 0; // Accumulate memory allocations
    }

    node.body?.forEach(traverse);

    if (node.type === "ForStatement") {
      currentDepth--;
    }
  }

  traverse(ast);

  // Time Complexity Logic
  let timeComplexity = { best: "O(1)", average: "O(1)", worst: "O(1)" };
  if (maxNestedLoops === 1) {
    timeComplexity = { best: "O(n)", average: "O(n)", worst: "O(n)" };
  } else if (maxNestedLoops === 2) {
    timeComplexity = { best: "O(n²)", average: "O(n²)", worst: "O(n²)" };
  } else if (maxNestedLoops === 3) {
    timeComplexity = { best: "O(n³)", average: "O(n³)", worst: "O(n³)" };
  } else if (maxNestedLoops > 3) {
    timeComplexity = {
      best: `O(n^${maxNestedLoops})`,
      average: `O(n^${maxNestedLoops})`,
      worst: `O(n^${maxNestedLoops})`,
    };
  }

  // Adjust for recursion
  if (hasRecursion) {
    timeComplexity = {
      best: "O(log n)",
      average: `O(${timeComplexity.average} log n)`,
      worst: `O(${timeComplexity.worst} log n)`,
    };
  }

  // Space Complexity Logic
  let spaceComplexity = "O(1)";
  if (memoryAllocations > 0) {
    spaceComplexity = `O(n^${memoryAllocations})`;
  }
  if (hasRecursion) {
    spaceComplexity = `O(log n)`;
  }

  return {
    timeComplexity,
    spaceComplexity,
  };
}

// Example Usage:
const code = `
function fiveDMatrixManipulation(n) {
  const matrix = Array.from({ length: n }, () =>
    Array.from({ length: n }, () =>
      Array.from({ length: n }, () =>
        Array.from({ length: n }, () =>
          Array(n).fill(0)
        )
      )
    )
  );

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      for (let k = 0; k < n; k++) {
        for (let l = 0; l < n; l++) {
          for (let m = 0; m < n; m++) {
            matrix[i][j][k][l][m] = i + j + k + l + m;
          }
        }
      }
    }
  }

  return matrix;
}
`;

const ast = parseCode(code);
const analysis = analyzeAST(ast);
console.log("AST:", JSON.stringify(ast, null, 2));
console.log("Analysis:", analysis);

// import { AlgorithmData } from "../types/Algorithm";

// interface ASTNode {
//   type: string;
//   body?: ASTNode[];
//   init?: any;
//   test?: any;
//   update?: any;
//   consequent?: any;
//   alternate?: any;
//   declarations?: any[];
// }

// export function parseCode(code: string): ASTNode {
//   // Simple AST parser for basic code structures
//   const lines = code.split("\n").map((line) => line.trim());
//   const ast: ASTNode = { type: "Program", body: [] };

//   for (let i = 0; i < lines.length; i++) {
//     const line = lines[i];

//     // Detect loops
//     if (line.startsWith("for")) {
//       ast.body?.push({
//         type: "ForStatement",
//         init:
//           line.includes("let") ||
//           line.includes("var") ||
//           line.includes("const"),
//         test: line.includes("<") || line.includes(">"),
//         update: line.includes("++") || line.includes("--"),
//       });
//     }

//     // Detect recursion
//     if (
//       line.includes("function") &&
//       code.includes(line.split("function")[1].split("(")[0].trim())
//     ) {
//       ast.body?.push({
//         type: "RecursiveFunction",
//       });
//     }

//     // Detect sorting operations
//     if (
//       line.includes("sort") ||
//       line.includes("merge") ||
//       line.includes("quick")
//     ) {
//       ast.body?.push({
//         type: "SortOperation",
//       });
//     }

//     // Detect divide and conquer
//     if (line.includes("mid") || line.includes("middle")) {
//       ast.body?.push({
//         type: "DivideAndConquer",
//       });
//     }
//   }

//   return ast;
// }

// export function analyzeAST(ast: ASTNode): {
//   timeComplexity: { best: string; average: string; worst: string };
//   spaceComplexity: string;
// } {
//   let nestedLoops = 0;
//   let hasRecursion = false;
//   let hasDivideConquer = false;
//   let hasSorting = false;
//   let maxSpaceComplexity = "O(1)";

//   function traverse(node: ASTNode) {
//     if (node.type === "ForStatement") {
//       nestedLoops++;
//     }
//     if (node.type === "RecursiveFunction") {
//       hasRecursion = true;
//       maxSpaceComplexity = "O(log n)";
//     }
//     if (node.type === "DivideAndConquer") {
//       hasDivideConquer = true;
//     }
//     if (node.type === "SortOperation") {
//       hasSorting = true;
//     }
//     if (node.body) {
//       node.body.forEach(traverse);
//     }
//   }

//   traverse(ast);

//   let timeComplexity = {
//     best: "O(1)",
//     average: "O(1)",
//     worst: "O(1)",
//   };

//   // Determine time complexity
//   if (nestedLoops >= 2) {
//     timeComplexity = {
//       best: "O(n²)",
//       average: "O(n²)",
//       worst: "O(n²)",
//     };
//   } else if (hasSorting) {
//     timeComplexity = {
//       best: "O(n log n)",
//       average: "O(n log n)",
//       worst: "O(n²)",
//     };
//   } else if (hasDivideConquer) {
//     timeComplexity = {
//       best: "O(log n)",
//       average: "O(log n)",
//       worst: "O(n)",
//     };
//   } else if (hasRecursion) {
//     timeComplexity = {
//       best: "O(n)",
//       average: "O(n log n)",
//       worst: "O(n²)",
//     };
//   } else if (nestedLoops === 1) {
//     timeComplexity = {
//       best: "O(n)",
//       average: "O(n)",
//       worst: "O(n)",
//     };
//   }

//   // Determine space complexity
//   if (hasRecursion && nestedLoops >= 1) {
//     maxSpaceComplexity = "O(n)";
//   } else if (hasDivideConquer) {
//     maxSpaceComplexity = "O(log n)";
//   }

//   return {
//     timeComplexity,
//     spaceComplexity: maxSpaceComplexity,
//   };
// }
