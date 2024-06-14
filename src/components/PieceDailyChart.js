import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PieceDailyChart = ({ pieces }) => {
  if (!pieces.length) {
    return <div>No data available</div>;
  }

  const dayLabels = [...new Set(pieces.map(piece => new Date(piece.timestamp).toDateString()))];
  const pieceLabels = [...new Set(pieces.map(piece => piece.label))];

  const datasets = pieceLabels.map(label => {
    const data = dayLabels.map(day => {
      const count = pieces.filter(piece => piece.label === label && new Date(piece.timestamp).toDateString() === day).length;
      return count;
    });
    return {
      label,
      data,
      backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      borderColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      borderWidth: 1,
    };
  });

  const data = {
    labels: dayLabels,
    datasets,
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="mb-8 bg-darkCard p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-accent">Daily Piece Chart</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default PieceDailyChart;
