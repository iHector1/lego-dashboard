import React, { useState } from 'react';

const PieceList = ({ pieces, labels }) => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const piecesPerPage = 5;

  const filteredPieces = search
    ? pieces.filter(piece => piece.label.toLowerCase() === search.toLowerCase())
    : pieces;

  const indexOfLastPiece = currentPage * piecesPerPage;
  const indexOfFirstPiece = indexOfLastPiece - piecesPerPage;
  const currentPieces = filteredPieces.slice(indexOfFirstPiece, indexOfLastPiece);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-4 text-accent text-center">Piece List</h2>
      <select
        className="mb-4 p-3 rounded-md bg-gray-700 border border-gray-600 text-white w-full"
        value={search}
        onChange={e => setSearch(e.target.value)}
      >
        <option value="">All Labels</option>
        {labels.map(label => (
          <option key={label} value={label}>{label}</option>
        ))}
      </select>
      <table className="min-w-full bg-gray-700 border border-gray-600">
        <thead>
          <tr className="bg-gray-600">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Image</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Label</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Timestamp</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody className="bg-gray-700 divide-y divide-gray-600">
          {currentPieces.map((piece, index) => (
            <tr key={index} className="hover:bg-gray-600">
              <td className="px-6 py-4 whitespace-nowrap">
                <img src={piece.url} alt={piece.label} className="inline-block w-16 h-16" />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{piece.label}</td>
              <td className="px-6 py-4 whitespace-nowrap">{new Date(piece.timestamp).toLocaleString()}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded"
                  onClick={() => window.open(piece.url, '_blank')}
                >
                  View Image
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        piecesPerPage={piecesPerPage}
        totalPieces={filteredPieces.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

const Pagination = ({ piecesPerPage, totalPieces, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPieces / piecesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="mt-4">
      <ul className="inline-flex -space-x-px">
        {pageNumbers.map(number => (
          <li key={number}>
            <a
              onClick={() => paginate(number)}
              href="#!"
              className={`py-2 px-3 leading-tight ${currentPage === number ? 'text-primary bg-gray-700' : 'text-gray-400 bg-gray-800'} border border-gray-700 hover:bg-gray-700 hover:text-white`}
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default PieceList;
