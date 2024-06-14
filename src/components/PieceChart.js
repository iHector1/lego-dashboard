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

const PieceChart = ({ pieces, labels }) => {
  if (!pieces.length) {
    return <div>No data available</div>;
  }

  const dataCounts = labels.map(label => pieces.filter(piece => piece.label === label).length);
  const colors = labels.map(() => `#${Math.floor(Math.random() * 16777215).toString(16)}`);

  const data = {
    labels,
    datasets: [
      {
        label: 'Piece Count',
        data: dataCounts,
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1,
      },
    ],
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
      <h2 className="text-2xl font-bold mb-4 text-accent">Piece Chart</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default PieceChart;
