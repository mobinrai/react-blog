import { CalendarMonth, FolderOpen, Person } from '@mui/icons-material'
import React from 'react'
import { Link } from 'react-router-dom'

const PostMetaData = ({createdAt='', categoryName='', categoryLink='', authorName='', authorLink='', children}) => {
  return (
    <ul className="post-meta-data flex flex-wrap gap-4 text-gray-400 text-md">
        <li className='flex items-center gap-1'><CalendarMonth fontSize='sm'></CalendarMonth>{createdAt}</li>
        <li className=''>
            <Link to={`/author/${authorLink}`} className='flex gap-1 items-center hover:text-[#ee4276]'><Person/> {authorName}</Link>
        </li>
        <li>
            <Link to={`/cat/${categoryLink}`} className='flex gap-1 items-center hover:text-[#ee4276]'><FolderOpen/>{categoryName}</Link>
        </li>
        {children}
    </ul>
  )
}

export default PostMetaData