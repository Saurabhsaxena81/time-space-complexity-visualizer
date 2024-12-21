import React, { useState } from 'react';
import { CodeEditor } from './components/CodeEditor';
import { ComplexityChart } from './components/ComplexityChart';
import { ComplexityTable } from './components/ComplexityTable';
import { ComplexityGraph } from './components/ComplexityGraph';
import { CodeInput } from './components/CodeInput';
import { algorithms } from './data/algorithms';
import { AlgorithmData } from './types/Algorithm';
import { Info, Code } from 'lucide-react';

function App() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<AlgorithmData>(algorithms[0]);
  const [mode, setMode] = useState<'examples' | 'analyze'>('examples');
  const [animationState, setAnimationState] = useState({
    progress: 0,
    currentStep: 0,
    isPlaying: false
  });

  const handleCodeAnalysis = (result: AlgorithmData) => {
    setSelectedAlgorithm(result);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Algorithm Complexity Visualizer
        </h1>
        
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setMode('examples')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md ${
              mode === 'examples' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'
            }`}
          >
            <Info size={20} />
            Example Algorithms
          </button>
          <button
            onClick={() => setMode('analyze')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md ${
              mode === 'analyze' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'
            }`}
          >
            <Code size={20} />
            Analyze Code
          </button>
        </div>

        {mode === 'examples' && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-2xl font-semibold">Select Algorithm</h2>
              <Info className="text-gray-500" size={20} />
            </div>
            <select
              value={selectedAlgorithm.name}
              onChange={(e) => setSelectedAlgorithm(
                algorithms.find(a => a.name === e.target.value) || algorithms[0]
              )}
              className="w-full md:w-64 p-2 border rounded-md"
            >
              {algorithms.map(algo => (
                <option key={algo.name} value={algo.name}>
                  {algo.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {mode === 'analyze' && (
          <CodeInput onAnalyze={handleCodeAnalysis} />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">2D Visualization</h3>
            <ComplexityChart algorithm={selectedAlgorithm} />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">3D Visualization</h3>
            <ComplexityGraph 
              animationState={animationState}
              timeData={selectedAlgorithm.timeData}
              inputSizes={selectedAlgorithm.inputSizes}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <ComplexityTable algorithm={selectedAlgorithm} />
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Description</h3>
            <p className="text-gray-700 whitespace-pre-line">{selectedAlgorithm.description}</p>
          </div>
        </div>

        <CodeEditor algorithm={selectedAlgorithm} />
      </div>
    </div>
  );
}

export default App;