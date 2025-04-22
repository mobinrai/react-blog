import React from 'react'
import { Link } from 'react-router-dom'

const SiteSocialWidget = () => {
  return (
        <ul className="list-unlisted flex text-white">
            <li className='w-1/3'>
                <Link href="#" className='bg-[#225b99] block text-center py-7 px-4 font-bold max-sm:text-xs'>
                    
                    <span>12K <br /> Followers</span>
                </Link>
            </li>
            <li className='w-1/3'>
                <Link href="#" className='bg-[#00adf2] block text-center py-7 px-4 font-bold max-sm:text-xs'>
                    
                    <span>12.2K <br /> Followers</span>
                </Link>
            </li>
            <li className='w-1/3'>
                <Link href="#" className='bg-[#dc4d2d] block text-center py-7 px-4 font-bold max-sm:text-xs'>
                   
                    <span>5K <br /> Followers</span>
                </Link>
            </li>
        </ul>
  )
}

export default SiteSocialWidget