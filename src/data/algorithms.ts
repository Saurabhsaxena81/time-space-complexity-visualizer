const generateTimeData = (inputSizes: number[], complexity: 'linear' | 'logarithmic' | 'quadratic' | 'nlogn') => {
  return inputSizes.map(n => {
    switch (complexity) {
      case 'linear':
        return n;
      case 'logarithmic':
        return Math.log2(n);
      case 'quadratic':
        return n * n;
      case 'nlogn':
        return n * Math.log2(n);
      default:
        return n;
    }
  });
};

const inputSizes = [10, 20, 50, 100, 200, 500, 1000];

export const algorithms = [
  {
    name: 'Binary Search',
    timeComplexity: {
      best: 'O(1)',
      average: 'O(log n)',
      worst: 'O(log n)'
    },
    spaceComplexity: 'O(1)',
    code: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  
  return -1;
}`,
    description: 'Binary Search is a searching algorithm that finds the position of a target value within a sorted array.',
    inputSizes,
    timeData: {
      best: generateTimeData(inputSizes, 'linear').map(() => 1),
      average: generateTimeData(inputSizes, 'logarithmic'),
      worst: generateTimeData(inputSizes, 'logarithmic')
    }
  },
  {
    name: 'Quick Sort',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(log n)',
    code: `function quickSort(arr) {
  if (arr.length <= 1) return arr;
  
  const pivot = arr[0];
  const left = arr.slice(1).filter(x => x <= pivot);
  const right = arr.slice(1).filter(x => x > pivot);
  
  return [...quickSort(left), pivot, ...quickSort(right)];
}`,
    description: 'Quick Sort is a highly efficient, comparison-based sorting algorithm that uses a divide-and-conquer strategy.',
    inputSizes,
    timeData: {
      best: generateTimeData(inputSizes, 'nlogn'),
      average: generateTimeData(inputSizes, 'nlogn'),
      worst: generateTimeData(inputSizes, 'quadratic')
    }
  }
];