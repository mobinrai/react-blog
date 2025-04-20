import React from 'react'
import { formatCreatedDate } from '../../utils/dates'

const CommentDetails = ({comment, onClick}) => {
    return (
        <div className='flex gap-4'>
            <div>
                <img src={comment?.userId!=null?comment?.user?.img : `${import.meta.env.VITE_IK_DEFAULT_USER_IMAGE}`} 
                srcSet='' 
                className='rounded-[50%] w-10'
                alt={comment?.userId!=null?comment?.user?.fullName:'Default User Inage'}/>
            </div>
            <div className="meta-post">
                <p className='text-black font-bold'>{comment?.fullName}<span className='text-gray-500 font-light pl-3'>
                    {formatCreatedDate(comment?.createdAt)}</span></p>
                <p className="comments  mt-4">
                    {comment?.message}
                </p> 
                <button className='bg-[#323335] text-white py-1.5 px-3 mt-4 hover:bg-red-500 hover:transition-all hover:duration-200' type='button' onClick={()=>onClick(`${comment?._id}`)}>Reply</button>
            </div>
        </div>
    )
    }

export default CommentDetails