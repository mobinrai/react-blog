import React, { useCallback, useState } from 'react'
import StyledButton from '../../components/StyledButton'
import { Check, Clear, DeleteForever, Edit } from '@mui/icons-material'
import { Box, Modal } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import MyInfiniteScroll from '../../components/MyInfiniteScroll'

import useSetUserDetail from '../../hooks/useSetUserDetail'
import MyModal from '../../components/MyModal'
import { useModal } from '../../contexts/GlobalModalContext'
import Loading from '../../components/Loading'
import DisplayMessage from '../../components/DisplayMessage'

const ViewAllPosts = () => {    
   const {closeModal,openModal} = useModal()
    const [postToDeleteTitle, setPostToDeleteTitle] = useState('')
    const [postToDeleteId, setPostToDeleteId] = useState('')
    const [allPosts, setAllPost] = useState([])
    const {enabled,queryKey, isAdmin, userId,isPending, isError, getToken} = useSetUserDetail()

    const fetchPosts = useCallback(async (pageParam) => {
        let params = {page:pageParam}

        if(!isAdmin){
            params={...params, user:userId}
        }
        const token = await getToken()
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`,{
            params,
            headers: {
                "Content-Type": "application/json",
                Authorization:`Bearer ${token}`
            }
        })
        return res.data
    }, [userId, isAdmin])

    const deletePost = useMutation({
        mutationFn: async(deleteData)=>{
            const token = await getToken()
            return axios.patch(`${import.meta.env.VITE_API_URL}/posts/${deleteData.postId}/delete`,{}, {
                    headers: {
                    "Content-Type": "application/json",
                    Authorization:`Bearer ${token}`
                    }
            })
        },
        onSuccess:(data)=>{
            setAllPost(allPosts.filter(item => item._id !==postToDeleteId))
            closeModal()
            setPostToDeleteTitle('')
            setPostToDeleteId('')
        },
        onError:(error)=>{
            closeModal()
            setPostToDeleteTitle('')
            setPostToDeleteId('')
            toast.error('Could not delete post. please try again later.')
        } 
    }) 

    if(isPending) return <Loading/>
    if(isError) return <DisplayMessage  message='Could not set user id'/>

    const handleClose = ()=>{
        closeModal()
        setPostToDeleteTitle('')
        setPostToDeleteId('')
    }

    const handleDelete = ()=>{
        deletePost.mutate({
            postId:postToDeleteId
        })
    }

    const showModal = (id, title)=>{
        openModal()
        setPostToDeleteTitle(title)
        setPostToDeleteId(id)
    }
    
    return (
        <section className="view-all-post w-[75%]">
            {
                allPosts && (
                    <>
                        <MyModal>
                            <h2 id="parent-modal-title" className='text-center'>Are you sure you want to delete the post? </h2>
                            <h2 className='font-bold text-center my-4'>{postToDeleteTitle}</h2>
                            <div className="flex justify-center gap-4 mt-6">
                                <StyledButton width="40%" onClick={handleDelete}>Yes<Check/> </StyledButton>
                                <StyledButton width="40%" onClick={handleClose}>No<Clear/></StyledButton>
                            </div>                            
                        </MyModal>
                            {
                                <div className="w-full">
                                    {
                                        queryKey &&
                                        <MyInfiniteScroll fetchFunc={fetchPosts} setData={setAllPost} items={allPosts} enabled={enabled} queryKey={queryKey}>
                                            <div className='grid md:grid-cols-2 row-auto gap-10'>
                                                {
                                                    allPosts.map((post)=>{
                                                        return (
                                                            <div key={post._id} className='border shadow-md py-4 px-2 rounded-md'>
                                                                <h3 className='font-bold'>{post.title}</h3>
                                                                <p>{post.desc}</p>
                                                                <div className="flex gap-4 mt-4">
                                                                {
                                                                    post.isDeleted ? (
                                                                        <StyledButton width="w-full" onClick={()=>showModal(post._id, post.title)}>
                                                                            restore<DeleteForever/>
                                                                        </StyledButton>
                                                                    ) : (
                                                                        <>
                                                                        <StyledButton width="w-full">
                                                                            <a href={`/user/posts/${post._id}/edit`} className='w-full'>Edit<Edit/></a>
                                                                        </StyledButton>
                                                                        <StyledButton width="w-full" onClick={()=>showModal(post._id, post.title)}>
                                                                            Delete<DeleteForever/>
                                                                        </StyledButton>
                                                                        </>
                                                                    )
                                                                }
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </MyInfiniteScroll>
                                    }
                                </div>
                            }
                    </>
                )
            }
        </section>
    )
}

export default ViewAllPosts