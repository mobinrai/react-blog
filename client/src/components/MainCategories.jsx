import React from 'react'
import { Link } from 'react-router-dom'
import { useFetchAllCategory } from '../../queries/CategoryQuery'
import DisplayMessage from './DisplayMessage'

const MainCategories = ({className}) => {
  const {isPending, isError, data:categories, error} = useFetchAllCategory()
    
    return (
        <>
        {isPending &&  <DisplayMessage message='Loading category'/>}
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