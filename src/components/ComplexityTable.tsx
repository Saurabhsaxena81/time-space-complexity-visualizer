import React from 'react';
import { AlgorithmData } from '../types/Algorithm';

interface ComplexityTableProps {
  algorithm: AlgorithmData;
}

export const ComplexityTable: React.FC<ComplexityTableProps> = ({ algorithm }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Complexity Analysis</h3>
      <table className="w-full">
        <thead>
          <tr className="border-b-2">
            <th className="text-left py-2">Case</th>
            <th className="text-left py-2">Time Complexity</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="py-2">Best Case</td>
            <td className="py-2 text-green-600">{algorithm.timeComplexity.best}</td>
          </tr>
          <tr className="border-b">
            <td className="py-2">Average Case</td>
            <td className="py-2 text-blue-600">{algorithm.timeComplexity.average}</td>
          </tr>
          <tr className="border-b">
            <td className="py-2">Worst Case</td>
            <td className="py-2 text-red-600">{algorithm.timeComplexity.worst}</td>
          </tr>
          <tr>
            <td className="py-2">Space Complexity</td>
            <td className="py-2 text-purple-600">{algorithm.spaceComplexity}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};