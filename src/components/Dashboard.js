import React, { useEffect, useState } from 'react';
import PieceList from './PieceList';
import PieceChart from './PieceChart';
import PieceDailyChart from './PieceDailyChart';
import PieceScatterChart from './PieceScatterChart';

const Dashboard = () => {
  const [pieces, setPieces] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    const fetchPieces = async () => {
      try {
        const response = await fetch('http://192.168.2.191:5000/obtener_resultados');
        const data = await response.json();
        if (data.success) {
          setPieces(data.results);
          const uniqueLabels = [...new Set(data.results.map(piece => piece.label))];
          setLabels(uniqueLabels);
        } else {
          console.error('Error in API response:', data);
        }
      } catch (error) {
        console.error('Error fetching pieces:', error);
      }
    };

    fetchPieces();
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <header className="mb-6">
        <h1 className="text-5xl font-bold text-primary text-center">LEGO Piece Dashboard</h1>
      </header>
      <PieceChart pieces={pieces} labels={labels} />
      <PieceDailyChart pieces={pieces} />
      <PieceList pieces={pieces} labels={labels} />
    </div>
  );
};

export default Dashboard;
