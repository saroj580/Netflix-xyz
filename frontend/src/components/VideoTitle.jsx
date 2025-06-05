import React from 'react'
import { FaPlay } from "react-icons/fa";
import { CiCircleInfo } from "react-icons/ci";

const VideoTitle = () => {
    return (
        <div className='w-screen aspect-video absolute text-white pt-[18%] p-12'>
            <h1 className='text-3xl font-bold'>ScrewDrive</h1>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
            <div className='flex mt-8'>
                <button className='flex items-center px-6 py-2 bg-white font-semibold text-black rounded-md hover:opacity-80'>
                    <FaPlay className='text-black' />
                    <span className='ml-2'>Play</span>
                </button>
                <button className='flex mx-2 items-center px-6 py-2 bg-gray-800 opacity-60 text-white font-semibold rounded-md hover:opacity-80'>
                    <CiCircleInfo className='text-white text-2xl' />
                    <span className='ml-2'>MoreInfo</span>
                </button>
            </div>

        </div>
    )
}

export default VideoTitle
