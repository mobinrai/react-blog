import React from 'react'
import { Link } from 'react-router-dom'
import { useFetchAllCategory } from '../../queries/CategoryQuery'

const MainCategories = ({className}) => {
  const {isPending, isError, data:categories, error} = useFetchAllCategory()
  
  return (
    <>
    {isPending &&  <span>Loading</span>}
    {
        Array.isArray(categories)
        &&
        <ul className={className}>
            <li><Link to="/blogs" className='font-semibold text-base hover:text-[#ee4276] uppercase tracking-wider'>All Post</Link></li>
            { categories.map(item=>(
                <li key={item._id}><Link to={`/cat/${item.slug}`} className='font-bold text-base hover:text-[#ee4276] transition-all duration-[0.2s] uppercase tracking-wider'>{item.name}</Link></li>
            ))}
        </ul>
    }
    </>
    
  )
}

export default MainCategories