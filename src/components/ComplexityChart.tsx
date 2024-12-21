import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { AlgorithmData } from '../types/Algorithm';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ComplexityChartProps {
  algorithm: AlgorithmData;
}

export const ComplexityChart: React.FC<ComplexityChartProps> = ({ algorithm }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Time Complexity Analysis',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Time (ms)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Input Size (n)',
        },
      },
    },
  };

  const data = {
    labels: algorithm.inputSizes,
    datasets: [
      {
        label: 'Best Case',
        data: algorithm.timeData.best,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: 'Average Case',
        data: algorithm.timeData.average,
        borderColor: 'rgb(54, 162, 235)',
        tension: 0.1,
      },
      {
        label: 'Worst Case',
        data: algorithm.timeData.worst,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <Line options={options} data={data} />
    </div>
  );
};