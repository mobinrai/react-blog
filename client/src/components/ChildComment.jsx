import React from 'react'
import CommentDetails from './CommentDetails';

const ChildComment = ({data, onReplyClick}) => {
    const parentId = data?._id
    return (
        <>
            <ul className='flex flex-col gap-4 ml-9'>
            {
            data && 
            <li key={parentId} className='flex flex-col gap-4 pt-4'>
                    <CommentDetails comment={data} onClick={onReplyClick}/>               
                    {
                    data.children.map(child=>{
                        return  <ChildComment key={child._id} data={child}  onReplyClick={onReplyClick}/>
                        })
                    
                    }
                </li>
                }
            </ul>
        </>
  )
}

export default ChildComment