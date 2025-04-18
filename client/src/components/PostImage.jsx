import React from 'react'
import { Link } from 'react-router-dom'
import ImageKit from './ImageKit'

const PostImage = ({to="/", path='default-image.jpg', linkClass="", alt="", imageClass="", width, height}) => {
  return (
    <Link to={to} className={`overflow-hidden relative inline-block after:content-empty after:absolute group after:top-0 after:bottom-0 after:left-0 after:w-full ${linkClass}`}>
        <ImageKit path={path} className={`transition-transform ease-in duration-700 group-hover:scale-[1.1] ${imageClass}`} w={width} h={height} alt={alt}/>
    </Link>
  )
}

export default PostImage