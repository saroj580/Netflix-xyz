import React, { useState } from 'react';

function MovieCard({ movie }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`relative bg-gray-800 rounded-lg shadow-lg p-2 w-64 flex-shrink-0 flex flex-col items-center transition-all duration-300 ${hovered ? 'z-20 scale-110' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ minHeight: '300px' }}
    >
      {movie['#IMG_POSTER'] && (
        <img src={movie['#IMG_POSTER']} alt={movie['#TITLE']} className="mb-3 w-full h-48 object-cover rounded" />
      )}
      <h2 className="text-lg font-bold text-white mb-1 text-center">
        {movie['#TITLE'] || movie.title || movie.name}
      </h2>
      {hovered && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-95 flex flex-col justify-center items-center rounded-lg p-4 transition-all duration-300 shadow-2xl">
          <img src={movie['#IMG_POSTER']} alt={movie['#TITLE']} className="mb-2 w-full h-40 object-cover rounded" />
          <h2 className="text-xl font-bold text-white mb-2">{movie['#TITLE']}</h2>
          <p className="text-green-400 mb-2">58% match</p>
          <p className="text-white mb-2">U/A 16+ 2h 42m HD</p>
          <p className="text-gray-300 mb-2">{movie['#ACTORS']}</p>
          <p className="text-gray-400 mb-2">{movie['#YEAR']}</p>
          <div className="flex gap-2 mb-2">
            <button className="bg-white text-black px-3 py-1 rounded">▶</button>
            <button className="bg-gray-700 text-white px-3 py-1 rounded">+</button>
            <button className="bg-gray-700 text-white px-3 py-1 rounded">⤴</button>
          </div>
          <a href={movie['#IMDB_URL']} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline text-xs text-center">
            View on IMDB
          </a>
        </div>
      )}
    </div>
  );
}

export default MovieCard;
