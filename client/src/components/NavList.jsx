import React from 'react'

const NavList = ({}) => {
  return (
    <ul className="py-6 flex gap-4">
        <li><Link to="/" className='font-semibold text-base hover:text-[#ee4276] uppercase tracking-wider'>Home</Link></li>
        <li><Link to="/blogs/single-blog" className='font-bold text-base hover:text-[#ee4276] uppercase tracking-wider'>React</Link></li>
        <li><Link to="" className='font-bold text-base hover:text-[#ee4276] uppercase tracking-wider'>Javascript</Link></li>
        <li><Link to="" className='font-bold text-base hover:text-[#ee4276] uppercase tracking-wider'>Html</Link></li>
        <li><Link to="" className='font-bold text-base hover:text-[#ee4276] uppercase tracking-wider'>Css</Link></li>
        <li><Link to="" className='font-bold text-base hover:text-[#ee4276] uppercase tracking-wider'>About</Link></li>
    </ul>
  )
}

export default NavList