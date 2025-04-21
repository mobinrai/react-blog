import React from 'react'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import ChildComment from './ChildComment';
import DisplayMessage from './DisplayMessage';
import CommentDetails from './CommentDetails';

const Comments = ({postId, onClick}) => {
    
    const {isPending, isError, data:comments, error} = useQuery({
        queryKey: ['comments', postId],
        queryFn: async () => {
            try{
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/comments/withChildren`,{
                    params:{postId}
                });
                return res.data;
            }catch(error){
                console.log(error);
            }
        }
    });
    if(isPending){
        return <DisplayMessage message='Comments are loading...' />
    }

    if(isError){
        return <DisplayMessage message={`Error : ${error.message}.`}/>
    }

    if(comments.length<1){
        return <DisplayMessage message='No comments found. Be the first one.'/>
    }
    return (
        <ul className='flex flex-col gap-4 my-6'>
        {
            comments && comments.map((comment)=>{
                return <li key={comment._id} className='flex flex-col gap-4 border-b pb-4'>
                        <CommentDetails comment={comment} onClick={onClick}/>
                        {
                            comment.children && comment.children.map(child=>{
                                return <ChildComment key={child._id} data={child} onReplyClick={onClick}/>
                            })
                        }
                </li>
            })   
        }
        </ul> 
  )
}

export default Comments