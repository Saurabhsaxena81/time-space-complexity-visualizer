export interface AlgorithmData {
  name: string;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
  code: string;
  description: string;
  inputSizes: number[];
  timeData: {
    best: number[];
    average: number[];
    worst: number[];
  };
}

export interface AnimationState {
  progress: number;
  currentStep: number;
  isPlaying: boolean;
}