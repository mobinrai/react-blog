import React from 'react'
import { Link } from 'react-router-dom'

const MyLink = ({to, linkName, className, type}) => {
    const categoryClass = `transition-all duration-200 hover:text-black dark:hover:text-white text-[#ee4266] font-bold`
    const linkClass = `transition-all duration-200 hover:text-[#ee4266] font-bold`
    return (
        <Link to={to} className={`${type == 'category' ? categoryClass : linkClass} ${className ?? ''}` }>{linkName}</Link>
    )
}

export default MyLink