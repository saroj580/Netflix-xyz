import React, { useEffect, useState } from 'react'
import Header from './Header'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import MainContainer from './MainContainer';
import MovieContainer from './MovieContainer';
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import usePopularMovies from '../hooks/usePopularMovies';
import useTopRatedMovies from '../hooks/useTopRatedMovies';
import useUpcomingMovies from '../hooks/useUpcomingMovies';
import useImdbMovies from '../hooks/useImdbMovies';

function Browse() {
    const user = useSelector((store) => store.user.user);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [query, setQuery] = useState('');

    //custom hooks
    useNowPlayingMovies();
    usePopularMovies();
    useTopRatedMovies();
    useUpcomingMovies();
    useImdbMovies(query);
    
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

    return (
        <div>
            <Header />
            <div>
                <MainContainer />
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <p className="text-white">Loading movies...</p>
                    </div>
                ) : (
                    <MovieContainer />
                )}
            </div>
        </div>
    )
}

export default Browse
