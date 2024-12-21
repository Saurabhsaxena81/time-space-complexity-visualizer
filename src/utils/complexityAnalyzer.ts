import { AlgorithmData } from '../types/Algorithm';
import { parseCode, analyzeAST } from './astAnalyzer';

function analyzeCodePatterns(code: string): {
  hasArrayCreation: boolean;
  hasHashMap: boolean;
  hasRecursion: boolean;
} {
  return {
    hasArrayCreation: /new Array|Array\(|=\s*\[/.test(code),
    hasHashMap: /new Map|new Set|{\s*}/.test(code),
    hasRecursion: new RegExp(code.split('function')[1]?.split('(')[0]?.trim() || 'a^', 'g').test(code)
  };
}

export function analyzeComplexity(code: string): AlgorithmData {
  const ast = parseCode(code);
  const { timeComplexity, spaceComplexity } = analyzeAST(ast);
  const patterns = analyzeCodePatterns(code);

  // Adjust space complexity based on additional patterns
  let finalSpaceComplexity = spaceComplexity;
  if (patterns.hasArrayCreation) {
    finalSpaceComplexity = 'O(n)';
  }
  if (patterns.hasHashMap) {
    finalSpaceComplexity = 'O(n)';
  }

  const inputSizes = [10, 20, 50, 100, 200, 500, 1000];

  return {
    name: 'User Code',
    timeComplexity,
    spaceComplexity: finalSpaceComplexity,
    code,
    description: generateDescription(timeComplexity, finalSpaceComplexity, patterns),
    inputSizes,
    timeData: {
      best: generateTimeData(timeComplexity.best, inputSizes),
      average: generateTimeData(timeComplexity.average, inputSizes),
      worst: generateTimeData(timeComplexity.worst, inputSizes)
    }
  };
}

function generateDescription(
  timeComplexity: { best: string; average: string; worst: string },
  spaceComplexity: string,
  patterns: { hasArrayCreation: boolean; hasHashMap: boolean; hasRecursion: boolean }
): string {
  let description = 'Analysis Results:\n\n';

  description += `Time Complexity:\n`;
  description += `• Best Case: ${timeComplexity.best} - `;
  description += getBigOExplanation(timeComplexity.best);
  description += `\n• Average Case: ${timeComplexity.average} - `;
  description += getBigOExplanation(timeComplexity.average);
  description += `\n• Worst Case: ${timeComplexity.worst} - `;
  description += getBigOExplanation(timeComplexity.worst);

  description += `\n\nSpace Complexity: ${spaceComplexity} - `;
  description += getBigOExplanation(spaceComplexity);

  if (patterns.hasArrayCreation) {
    description += '\n\nNote: Additional space is used for array creation.';
  }
  if (patterns.hasHashMap) {
    description += '\n\nNote: Hash map/set structures require additional memory.';
  }
  if (patterns.hasRecursion) {
    description += '\n\nNote: Recursive calls add to the space complexity through the call stack.';
  }

  return description;
}

function getBigOExplanation(complexity: string): string {
  switch (complexity) {
    case 'O(1)':
      return 'Constant time, independent of input size';
    case 'O(log n)':
      return 'Logarithmic growth, typically seen in divide-and-conquer algorithms';
    case 'O(n)':
      return 'Linear growth with input size';
    case 'O(n log n)':
      return 'Linearithmic growth, common in efficient sorting algorithms';
    case 'O(n²)':
      return 'Quadratic growth, typically seen in nested iterations';
    default:
      return 'Complexity grows with input size';
  }
}

function generateTimeData(complexity: string, inputSizes: number[]): number[] {
  return inputSizes.map(n => {
    switch (complexity) {
      case 'O(1)':
        return 1;
      case 'O(log n)':
        return Math.log2(n);
      case 'O(n)':
        return n;
      case 'O(n log n)':
        return n * Math.log2(n);
      case 'O(n²)':
        return n * n;
      default:
        return n;
    }
  });
}