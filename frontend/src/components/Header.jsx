import axios from 'axios';
import { IoIosArrowDropdown } from "react-icons/io";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import React, { useState } from 'react';
import { setSearchTerm } from '../redux/movieSlice';

function Header() {

// The first 'user' is the slice name from store configuration
  // The second 'user' is the property in userSlice state
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTermLocal] = useState('');
  const user = useSelector((store) => store.user.user);
  console.log("user from redux:", user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const logoutHandler = async() => {
    console.log("Logout clicked");
    try {
      const res = await axios.get("http://localhost:8080/api/v1/user/logout", {
        withCredentials : true
      });
      console.log(res);

      localStorage.setItem('intentionalLogout', 'true');

      dispatch(logout());
      toast.success("Logged out successfully")
      navigate('/');


    } catch (error) {

      console.log(error);
      toast.error("logout failed. Please try again.")
      
    }
  }
  
  return (
    <div className='absolute z-10 flex w-full items-center justify-between bg-gradient-to-b from-black px-6 py-4'>
      <img
        className='w-36 ml-32 '
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1198px-Netflix_2015_logo.svg.png?20190206123158"
        alt="netflixLogo"
      />

      <div className="flex items-center ml-auto">
        {user && (
          <div className='flex items-center transition-all duration-300'>
            <IoIosArrowDropdown size='24px' color='white'/>
            <h1 className='text-lg font-medium text-white'>{user.fullName}</h1>
            <button onClick={logoutHandler} className='bg-red-800 text-white px-4 py-2 ml-4'>Logout</button>
            {!showSearch && (
              <button
                className='ml-2 bg-red-800 text-white px-4 py-2'
                onClick={() => setShowSearch(true)}
              >
                Search Movie ...
              </button>
            )}
          </div>
        )}

        {showSearch && (
          <form
            onSubmit={e => {
              e.preventDefault();
              if (searchTerm.trim()) {
                dispatch(setSearchTerm(searchTerm));
                console.log("searchTerm:", searchTerm);
                setShowSearch(false);
              }
            }}
            className="flex items-center ml-4"
          >
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTermLocal(e.target.value)}
              placeholder="Search for a movie..."
              className="p-2 border rounded"
              autoFocus
            />
            <button type="submit" className="ml-2 bg-red-600 text-white px-3 py-1 rounded">
              Search Movie ...
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default Header
