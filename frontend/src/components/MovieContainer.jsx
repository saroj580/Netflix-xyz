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
        <div>
            {movies.map((movie, idx) => (
                <div key={idx} className="bg-gray-800 p-4 m-2 rounded">
                    <h2 className="text-xl font-bold text-white">
                        {movie.short?.name || movie.title || movie.name}
                    </h2>
                    <p className="text-gray-300">
                        {movie.short?.description || movie.description || movie.plot || movie.overview}
                    </p>
                    {movie.short?.image && (
                        <img src={movie.short.image} alt={movie.short?.name} className="my-2 w-48" />
                    )}
                </div>
            ))}
        </div>
    );
}

export default MovieContainer
