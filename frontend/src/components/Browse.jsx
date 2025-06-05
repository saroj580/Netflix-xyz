import React, { useEffect } from 'react'
import Header from './Header'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import MainContainer from './MainContainer';
import MovieContainer from './MovieContainer';

function Browse() {
    const user = useSelector((store) => store.user.user);
    const navigate = useNavigate();

    // Checking authentication immediately when component mounts
    useEffect(() => {
        console.log("Browse component mounted, user:", user);
        
        // If no user is logged in
        if (!user) {
            console.log("No user found, redirecting to login");
            
            // Checking if this was an intentional logout
            const intentionalLogout = localStorage.getItem('intentionalLogout') === 'true';
            
            // Only show toast if it wasn't an intentional logout
            if (!intentionalLogout) {
                toast.error("Please login to continue");
            }
            
            // Force navigation to login page
            navigate("/", { replace: true });
        } else {
            // Clear intentional logout flag if user is logged in
            localStorage.removeItem('intentionalLogout');
        }
    }, [user, navigate]);

    // Don't render anything if not authenticated
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
                <MovieContainer/>
            </div>
        </div>
    )
}

export default Browse
