import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Tooltip,
  Legend
);

const PieceScatterChart = ({ pieces }) => {
  if (!pieces.length) {
    return <div>No data available</div>;
  }

  const dataPoints = pieces.map(piece => ({
    x: new Date(piece.timestamp).getTime(),
    y: piece.count
  }));

  const data = {
    datasets: [
      {
        label: 'Piece Count Over Time',
        data: dataPoints,
        backgroundColor: '#4c51bf',
        borderColor: '#4c51bf',
        showLine: true,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
        },
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Piece Count',
        },
      },
    },
  };

  return (
    <div className="mb-8 bg-darkCard p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-accent">Piece Count Over Time</h2>
      <Scatter data={data} options={options} />
    </div>
  );
};

export default PieceScatterChart;
