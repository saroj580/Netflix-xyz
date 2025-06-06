import React from 'react';
import MovieCard from './MovieCard';

function MovieRow({ title, movies }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
      <div className="flex flex-row gap-6 overflow-x-auto py-2">
        {movies.map((movie, idx) => (
          <MovieCard key={idx} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default MovieRow;
