import React from 'react'
import { fetchAllPostByUserId } from '../../../queries/PostQuery'
import DisplayMessage from '../../components/DisplayMessage'
import { useUser } from '@clerk/clerk-react'
import StyledButton from '../../components/StyledButton'
import { DeleteForever, Edit } from '@mui/icons-material'

const ViewAllPosts = () => {
    const {user} = useUser()
    const {isPending, isError, data, error} = fetchAllPostByUserId(user.id)
    
    if(isPending){
        return <DisplayMessage message='Loading...'/>
    }

    if (isError) {
        return <DisplayMessage message={`Error: ${error.message}`}/>
    }

    const handleDelete = (id)=>{
        console.log(id);
    }
    return (
        <section className="view-all-post md:w-2/3 p-4">
            <div className="">
                <ul className='flex flex-col gap-4'>
                    {
                        data[0].posts.map((post)=>{
                            return (
                                <li key={post._id} className='border shadow-md py-4 px-2 rounded-md'>
                                    <h3 className='font-bold'>{post.title}</h3>
                                    <p>{post.desc}</p>
                                    <div className="flex gap-4 mt-4">
                                    <StyledButton width="30%">
                                        <a href={`/edit-post/${post._id}`} className='w-full'>Edit Post <Edit/></a>
                                    </StyledButton>
                                    <StyledButton width="30%" onClick={()=>handleDelete(post._id)}>
                                        Delete Post<DeleteForever/>
                                    </StyledButton>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
                
            </div>
        </section>
    )
}

export default ViewAllPosts