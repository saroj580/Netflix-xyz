import React from 'react'
import { IoIosArrowDropdown } from "react-icons/io";

function Header() {
  return (
    <div className='absolute z-10 flex w-[100%] items-center justify-between bg-gradient-to-b from-black px-6 py-4'>
      <img
        className='w-36 ml-32 '
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1198px-Netflix_2015_logo.svg.png?20190206123158"
        alt="netflixLogo"
      />
      <div className='flex items-center'>
        <IoIosArrowDropdown size='24px' color='white'/>
        <h1 className='text-lg font-medium text-white'>Saroj</h1>
        <div className='ml-4'>
          <button className='bg-red-800 text-white px-4 py-2'>Logout</button>
          <button className='ml-2 bg-red-800 text-white px-4 py-2'>Search Movie ... </button>
        </div>
      </div>
    </div>
  )
}

export default Header
