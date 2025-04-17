import React from 'react'
import { Link } from 'react-router-dom'

const PostListItem = () => {
  return (
    <>
        <div className="post-body bg-white relative ml-[3%] -mt-12 p-[5%] -mr-0.5 font-bold dark:bg-black dark:text-white">
            <div className="post-category text-red-600 mb-3">
                <Link href="" className='dark:hover:text-white hover:text-black transition-colors duration-200'>Travel</Link>
            </div>
            <h3 className="post-title text-sm mb-3">
                <Link href="" className='hover:text-[#ee4266]'>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam, molestias.
                </Link>
            </h3>
            <ul className="post-meta list-unstyled">
                <li className='inline-block text-[#97989b] uppercase'>
                    <Link href="http://" className="post-author uppercase text-gray-500 text-[12px] font-bold after:content-['.'] after:inline-block after:px-1">John deo</Link>
                </li>
            </ul>
        </div>
    </>
  )
}

export default PostListItem