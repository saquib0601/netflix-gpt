import React from 'react'

const VideoTitle = ({title, overview}) => {
  return (
    <div className="w-screen aspect-video pt-[20%] px-24 absolute text-white bg-gradient-to-r from-black">
        <h1 className="text-6xl font-bold">{title}</h1>
        <p className="text-lg py-6 w-1/4">{overview}</p>
        <div>
            <button className="bg-white-500 text-white p-4 w-10 text-xl px-16 bg-opacity-50 rounded-lg justify-between hover:bg-opacity-80">▶ Play</button>
            <button className="bg-gray-500 mx-2 text-white p-4 w-10 text-xl px-16 bg-opacity-50 rounded-lg text-justify">More Info</button>
        </div>
    </div>
  )
}

export default VideoTitle