import axios from 'axios';
import { IoIosArrowDropdown } from "react-icons/io";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Header() {

// The first 'user' is the slice name from store configuration
  // The second 'user' is the property in userSlice state
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
    <div className='absolute z-10 flex w-[100%] items-center justify-between bg-gradient-to-b from-black px-6 py-4'>
      <img
        className='w-36 ml-32 '
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1198px-Netflix_2015_logo.svg.png?20190206123158"
        alt="netflixLogo"
      />

      {
        user && (
          <div className='flex items-center'>
            <IoIosArrowDropdown size='24px' color='white'/>
            <h1 className='text-lg font-medium text-white'>{user.fullName}</h1>
            <div className='ml-4'>
              <button onClick = {logoutHandler} className='bg-red-800 text-white px-4 py-2'>Logout</button>
              <button className='ml-2 bg-red-800 text-white px-4 py-2'>Search Movie ... </button>
            </div>
          </div>
        )
      }


      
    </div>
  )
}

export default Header
