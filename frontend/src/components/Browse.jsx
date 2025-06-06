import React, { useEffect, useState, useMemo } from 'react'
import Header from './Header'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import MovieContainer from './MovieContainer';
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import usePopularMovies from '../hooks/usePopularMovies';
import useTopRatedMovies from '../hooks/useTopRatedMovies';
import useUpcomingMovies from '../hooks/useUpcomingMovies';
import useImdbMovies from '../hooks/useImdbMovies';
import VideoBackgground from './VideoBackgground'; 
import MovieRow from './MovieRow';
import { crimeMovies, tvShows, top10, shuffleArray } from '../data/movie';

function Browse() {
    const user = useSelector((store) => store.user.user);
    const navigate = useNavigate();
    const searchTerm = useSelector((state) => state.movie.searchTerm);

    //custom hooks
    useNowPlayingMovies();
    usePopularMovies();
    useTopRatedMovies();
    useUpcomingMovies();
    useImdbMovies();
    
    // Authentication check useEffect
    useEffect(() => {
        console.log("Browse component mounted, user:", user);
        
        if (!user) {
            console.log("No user found, redirecting to login");
            
            const intentionalLogout = localStorage.getItem('intentionalLogout') === 'true';
            
            if (!intentionalLogout) {
                toast.error("Please login to continue");
            }
            
            navigate("/", { replace: true });
        } else {
            localStorage.removeItem('intentionalLogout');
        }
    }, [user, navigate]);

    if (!user) {
        console.log("User not authenticated, rendering null");
        return null;
    }

    console.log("User authenticated, rendering Browse component");

    // Shuffle the movies for each row only once on mount
    const shuffledCrime = useMemo(() => shuffleArray(crimeMovies), []);
    const shuffledTV = useMemo(() => shuffleArray(tvShows), []);
    const shuffledTop10 = useMemo(() => shuffleArray(top10), []);

    return (
        <div>
            <Header />
            <VideoBackgground />
            <div className="px-8">
                {searchTerm
                    ? <MovieContainer />
                    : (
                        <>
                            <MovieRow title="Crime & Thriller Movies" movies={shuffledCrime} />
                            <MovieRow title="Critically Acclaimed TV Shows" movies={shuffledTV} />
                            <MovieRow title="Top 10 Movies in Netflix Today" movies={shuffledTop10} />
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default Browse
