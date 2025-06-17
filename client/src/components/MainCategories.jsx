import React from 'react'
import { Link } from 'react-router-dom'
import useFetchCategory from '../hooks/useFetchCategory'

const MainCategories = ({className}) => {
    const {categories} = useFetchCategory()
    
    return (
        <>
        {
            Array.isArray(categories)
            &&
            <ul className={className}>
                { categories.map(item=>(
                    <li key={item._id}><Link to={`/cat/${item.slug}`} className='font-bold text-base hover:text-[#ee4276] transition-all duration-[0.2s] uppercase tracking-wider'>{item.name}</Link></li>
                ))}
                
            </ul>
        }
        </>
        
    )
}

export default MainCategories