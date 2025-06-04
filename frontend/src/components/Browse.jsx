import React, { useEffect, useRef } from 'react'
import Header from './Header'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Browse() {
    const user = useSelector((store) => store.user.user);
    const navigate = useNavigate();
    const toastShownRef = useRef(false);

    useEffect(() => {
        if (!user && !toastShownRef.current) {
            toastShownRef.current = true;
            toast.error("Please login to continue");
            navigate("/");
        }
    }, [user, navigate]);

    if (!user) return null;

    return (
        <div>
            <Header />
            <div>
                
            </div>
        </div>
    )
}

export default Browse
