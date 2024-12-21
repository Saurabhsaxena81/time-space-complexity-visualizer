import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { AnimationState } from '../types/Algorithm';

interface ControlsProps {
  animationState: AnimationState;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
}

export const Controls: React.FC<ControlsProps> = ({
  animationState,
  onPlay,
  onPause,
  onReset,
}) => {
  return (
    <div className="flex items-center justify-center gap-4 p-4">
      <button
        onClick={animationState.isPlaying ? onPause : onPlay}
        className="p-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white"
      >
        {animationState.isPlaying ? <Pause size={24} /> : <Play size={24} />}
      </button>
      <button
        onClick={onReset}
        className="p-2 rounded-full bg-gray-600 hover:bg-gray-700 text-white"
      >
        <RotateCcw size={24} />
      </button>
    </div>
  );
};