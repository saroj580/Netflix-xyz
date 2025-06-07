import React from 'react'
import { useSelector } from 'react-redux';
import MovieCard from './MovieCard';

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
                    <MovieCard key={idx} movie={movie} />
                ))}
            </div>
        </div>
    );
}

export default MovieContainer