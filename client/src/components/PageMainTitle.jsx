import React from 'react'

const PageMainTitle = ({title, className}) => {
  return (
    <div className="w-full bg-[#1b1c1e] dark:bg-white text-white pt-20 pb-20 mt-4 relative top-0 flex justify-center items-center">
        <div className={`max-w-4xl mx-auto px-2.5 flex flex-col items-center justify-center text-center ${className ?? ''}`}>
            <h1 className='text-5xl font-bold capitalize dark:text-black'>{title}</h1>
        </div>
    </div>
  )
}

export default PageMainTitle