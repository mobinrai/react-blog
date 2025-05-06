import React, { useEffect, useState } from 'react'
import { useFetchPost } from '../../../queries/PostQuery'
import DisplayMessage from '../../components/DisplayMessage'
import { useAuth, useUser } from '@clerk/clerk-react'
import StyledButton from '../../components/StyledButton'
import { Check, Clear, DeleteForever, Edit } from '@mui/icons-material'
import { Box, Modal } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

const ViewAllPosts = () => {
    const {user} = useUser()
    const {getToken} = useAuth()
    const [openModal, setOpenModal] = useState(false)
    const [postToDeleteTitle, setPostToDeleteTitle] = useState('')
    const [postToDeleteId, setPostToDeleteId] = useState('')
    const [allPosts, setAllPost] = useState([])
    const {isPending, isError, isSuccess, data, error} = useFetchPost({userId:user.id, queryKey:['posts','user', user.id]})
    useEffect(()=>{
        if(isSuccess){
            setAllPost(data[0].posts)
        }
    },[isSuccess, data])
    const deletePost = useMutation({
        mutationFn: async(deleteData)=>{
            const token = await getToken()
            return axios.delete(`${import.meta.env.VITE_API_URL}/posts/${deleteData.postId}`, {
                headers: {
                "Content-Type": "application/json",
                Authorization:`Bearer ${token}`
                }
            })
        },
        onSuccess:(data)=>{
            setAllPost(allPosts.filter(item => item._id !==postToDeleteId))
            setOpenModal(false)
            setPostToDeleteTitle('')
            setPostToDeleteId('')
        },

        onError:(error)=>{
            console.log(error);
            setOpenModal(false)
            setPostToDeleteTitle('')
            setPostToDeleteId('')
            toast.error('Could not delete post. please try again later.')
        } 
    }) 

    if(isPending){
        return <DisplayMessage message='Loading...'/>
    }

    if (isError) {
        return <DisplayMessage message={`Error: ${error.message}`}/>
    }

    const handleClose = ()=>{
        
        setOpenModal(false)
        setPostToDeleteTitle('')
        setPostToDeleteId('')
    }

    const handleDelete = ()=>{
        deletePost.mutate({
            userId:user.id,
            postId:postToDeleteId
        })
    }

    const showModal = (id, title)=>{
        setOpenModal(true)
        setPostToDeleteTitle(title)
        setPostToDeleteId(id)
    }
    
    if(allPosts && allPosts.length ===0){
        return <DisplayMessage message='You have not created a blog.'/>
    }

    return (
        <section className="view-all-post w-[75%]">
            {
                allPosts && (
                    <>
                        <Modal
                            open={openModal}
                            onClose={handleClose}
                            aria-labelledby="are you sure"
                            sx={{
                                backgroundbackgroundColor: 'rgb(0 0 0 / 22%)',
                            }}
                        >
                            <Box sx={{
                                position:'absolute',
                                top:'40%',
                                left:'40%',
                                width:'400px',
                                backgroundColor:'white',
                                padding:'10px'

                            }}>
                            <h2 id="parent-modal-title" className='text-center'>Are you sure you want to delete the post? </h2>
                            <h2 className='font-bold text-center my-4'>{postToDeleteTitle}</h2>
                            <div className="flex justify-center gap-4 mt-6">
                                <StyledButton width="40%" onClick={handleDelete}>Yes<Check/> </StyledButton>
                                <StyledButton width="40%" onClick={handleClose}>No<Clear/></StyledButton>
                            </div>
                            </Box>
                        </Modal>
                        <div className="w-full">
                            <ul className='grid grid-cols-2 gap-4'>
                                {
                                    allPosts.map((post)=>{
                                        return (
                                            <li key={post._id} className='border shadow-md py-4 px-2 rounded-md'>
                                                <h3 className='font-bold'>{post.title}</h3>
                                                <p>{post.desc}</p>
                                                <div className="flex gap-4 mt-4">
                                                <StyledButton width="w-full">
                                                    <a href={`/user/posts/${post._id}/edit`} className='w-full'>Edit Post <Edit/></a>
                                                </StyledButton>
                                                <StyledButton width="w-full" onClick={()=>showModal(post._id, post.title)}>
                                                    Delete Post<DeleteForever/>
                                                </StyledButton>
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>                            
                        </div>
                    </>
                )
            }
        </section>
    )
}

export default ViewAllPosts