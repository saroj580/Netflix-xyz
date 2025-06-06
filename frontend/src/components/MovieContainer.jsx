import React from 'react'
import { useSelector } from 'react-redux';

function MovieContainer() {
    const moviesRaw = useSelector((state) => state.movie.nowPlayingMovies);

    // If it's an array, use as is. If it's an object, wrap in an array.
    let movies = [];
    if (Array.isArray(moviesRaw)) {
        movies = moviesRaw;
    } else if (moviesRaw && typeof moviesRaw === 'object') {
        movies = [moviesRaw];
    }

    console.log('Movies in MovieContainer:', moviesRaw, Array.isArray(moviesRaw));

    if (movies.length === 0) {
        return <div className="text-white">No movies found.</div>;
    }

    return (
        <div className="overflow-x-auto whitespace-nowrap py-4" style={{background: '#232a34'}}>
            <div className="flex flex-row gap-6" style={{minWidth: 'max-content'}}>
                {movies.map((movie, idx) => (
                    <div key={idx} className="bg-gray-800 rounded-lg shadow-lg p-4 w-64 flex-shrink-0 flex flex-col items-center">
                        {movie['#IMG_POSTER'] && (
                            <img src={movie['#IMG_POSTER']} alt={movie['#TITLE']} className="mb-3 w-full h-80 object-cover rounded" />
                        )}
                        <h2 className="text-lg font-bold text-white mb-1 text-center">
                            {movie['#TITLE'] || movie.title || movie.name}
                        </h2>
                        <p className="text-gray-300 text-sm mb-1 text-center">
                            Year: {movie['#YEAR']}
                        </p>
                        <p className="text-gray-400 text-xs mb-2 text-center">
                            Actors: {movie['#ACTORS']}
                        </p>
                        <a href={movie['#IMDB_URL']} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline text-xs text-center">
                            View on IMDB
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MovieContainer
