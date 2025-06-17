import React from 'react'
import { formatCreatedDate } from '../../utils/dates'
import { Avatar } from '@mui/material'

const CommentDetails = ({comment, onClick}) => {
    return (
        <div className='flex gap-4'>
            {
                comment?.user!=null ?
                <div>
                    <img src={comment?.user?.img} 
                srcSet='' 
                className='rounded-[50%] w-10 mr-4 ml-1 top-2 relative'
                alt={comment?.user?.fullName}/>
                </div>
                :
                <Avatar sx={{height:'40px', position:'relative', top:'10px', marginRight:'10px'}}/>
            }
            <div className="meta-post border p-4 w-full rounded-md relative before:content-[''] before:w-[20px] before:h-[20px] before:border before:absolute before:top-5 before:left-0 before:z-20 before:transform before:-translate-x-1/2 before:-rotate-[45deg] before:border-r-[0px] before:border-b-[0px] before:bg-white">
                {
                    !comment.isDeleted ?
                    <>
                        <div className="flex justify-between">
                            <div className="flex flex-col gap-1">
                            <p className='text-black font-bold'>{comment?.fullName}</p>
                            <span className='text-gray-500 font-light text-md'>
                            {formatCreatedDate(comment?.createdAt)}</span>
                        </div>
                        <button className='bg-[#323335] text-white py-1.5 px-3 mt-4 hover:bg-red-500 hover:transition-all hover:duration-200' type='button' onClick={()=>onClick(`${comment?._id}`)}>Reply</button>
                        </div>
                        <p className="comments  mt-4">
                            {comment?.message}
                        </p>
                    </>
                    :
                    <p className='font-bold text-gray-500 italic'>User has deleted this commnet</p>
                }
            </div>
        </div>
    )
    }

export default CommentDetails