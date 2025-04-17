import React from 'react'
import { Link } from 'react-router-dom'

const MainCategories = ({className}) => {
  return (
    <ul className={className}>
        <li><Link to="/blogs" className='font-semibold text-base hover:text-[#ee4276] uppercase tracking-wider'>All Post</Link></li>
        <li><Link to="/technology" className='font-bold text-base hover:text-[#ee4276] transition-all duration-[0.2s] uppercase tracking-wider'>Technology</Link></li>
        <li><Link to="/web-design" className='font-bold text-base hover:text-[#ee4276] transition-all duration-[0.2s] uppercase tracking-wider'>Web design</Link></li>
        <li><Link to="/development" className='font-bold text-base hover:text-[#ee4276] transition-all duration-[0.2s] uppercase tracking-wider'>Development</Link></li>
        <li><Link to="/database" className='font-bold text-base hover:text-[#ee4276] transition-all duration-[0.2s] uppercase tracking-wider'>Database</Link></li>
    </ul>                
  )
}

export default MainCategories