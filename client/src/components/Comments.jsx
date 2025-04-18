import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import { formatCreatedDate } from '../../utils/dates';

const Comments = ({postId}) => {
    const {isPending, isError, data:comments, error} = useQuery({
        queryKey: ['comments', postId],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/comments/`,{
                params:{post:postId}
            });
            return res.data;
        }
    });
    if(isPending){
        return <span>Comments are loading...</span>
    }

    if(isError){
        return <span>Error : {error.message}.</span>
    }

    if(comments.length<1){
        return <span className='my-4'>No comments found. Be the first to make a comment.</span>
    }
    return (
        <>
        {
          comments && comments.map((comment)=>{
            
            return <li key={comment._id} className='flex gap-4'>
            <div>
                <img src="../images/users/avatar-1.jpg.webp" className='rounded-[50%] w-12' alt="" srcset=""/>
            </div>
            <div className="meta-post">
                <p className='text-black font-bold'>{comment.fullName}<span className='text-gray-500 font-light pl-3'>
                    {formatCreatedDate(comment.createdAt)}</span></p>
                <p className="comments  mt-4">
                    {comment.message}
                </p>
                <button className='bg-[#323335] text-white py-1.5 px-3 mt-4'>Reply</button>
                
            </div>
        </li>
          })   
        }
        </>  
  )
}

export default Comments