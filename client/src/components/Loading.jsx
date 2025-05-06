import React from 'react'

const Loading = () => {
  return (
        <div className='fixed bg-black top-0 right-0 left-0 bottom-0 z-50 overflow-hidden'>
            <div className="absolute top-1/2 left-1/2">
            <div className="border-solid border-[4px] border-[#f3f3f3] animate-spin border-t-solid border-t-[4px] border-t-blue-700 rounded-[50%] h-10 w-10"></div>
            </div>
        </div>

  )
}

export default Loading