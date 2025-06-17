import React, { useState } from 'react'
import useSetUserDetail from '../../hooks/useSetUserDetail'
import MyInfiniteScroll from '../../components/MyInfiniteScroll'
import axios from 'axios'
import { formatCreatedDate } from '../../../utils/dates'
import StyledButton from '../../components/StyledButton'
import { Cancel, Check, Clear, DeleteForever, Edit } from '@mui/icons-material'
import MyModal from '../../components/MyModal'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useModal } from '../../contexts/GlobalModalContext'
import { TextField } from '@mui/material'
import Loading from '../../components/Loading'
import DisplayMessage from '../../components/DisplayMessage'

const ViewAllComments = () => {
    const {closeModal,openModal} = useModal()
    const [allComments, setAllComments] = useState([])
    const [commentDetail, setEditDeleteComment] = useState({})
    const {enabled, queryKey, isAdmin, userId, isPending, isError, getToken} = useSetUserDetail()
    const queryClient = useQueryClient();
    
    const fetchAllComments = async (pageParam) => {
        let params = {page:pageParam}        
        if(!isAdmin){
            params={...params, user:userId}
        }
        const token = await getToken()
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/comments/getAllComments`,{
            params,
            headers: {
                Authorization:`Bearer ${token}`
            }
        })
        return res.data
    }

    const deleteCommentMutaion = useMutation({
        mutationKey:['allComment', userId],
        mutationFn: async({payload={},meta={}}) =>{
            const token = await getToken()
            const {data} = await axios.patch(`${import.meta.env.VITE_API_URL}/comments/${payload.id}/${meta.name}`, payload, {
                headers: {
                "Content-Type": "application/json",
                Authorization:`Bearer ${token}`
                }
            })
            return {data, meta}
        },onSuccess:(result)=>{
            closeModal()
            queryClient.invalidateQueries(['allComment', userId])
            setEditDeleteComment({})
            toast.success(`${result.data}`)
        },
        onError:(error)=>{
            closeModal()
            setEditDeleteComment({})
            toast.error('Could not delete comment. please try again later.')
        }
    })

    if(isPending) return <Loading/>
    if(isError) return <DisplayMessage  message='Could not set user id'/>

    const handleClose = ()=>{
        setEditDeleteComment({})
        closeModal()
    }

    const handleDelete=()=>{
        let payload = {id:commentDetail.id}
        if(commentDetail.type ==='edit'){
            payload.message = commentDetail.value
        }
        deleteCommentMutaion.mutate({
            payload,
            meta:{name:commentDetail.type}
        })
    }

    const showModal = (id, message='', type='')=>{
        setEditDeleteComment({
            id,
            value:message,
            type
        })
        openModal()
    }
    return (
        <section className="all-comments w-[75%]">
            <div className="">
                {
                    queryKey  &&
                    <>
                        <MyModal>
                            {
                                Object.keys(commentDetail).length>0 &&
                                commentDetail.type ==='delete' ?
                                <>
                                    <h2 id="parent-modal-title" className='text-center'>Are you sure you want to delete this comment?</h2>
                                    <h2 className='font-bold text-center my-4'>{commentDetail?.value}</h2>
                                    <div className="flex justify-center gap-4 mt-6">
                                        <StyledButton width="40%" onClick={handleDelete}>Yes<Check/> </StyledButton>
                                        <StyledButton width="40%" onClick={handleClose}>No<Clear/></StyledButton>
                                    </div>
                                </>
                                :
                                <div className='flex flex-col gap-4'>
                                    <h3 className='font-bold italic'>Edit Comment</h3>
                                     <TextField variant="outlined"
                                        id='message'
                                        name='message'
                                        multiline
                                        defaultValue={commentDetail?.value|| ''}
                                        fullWidth={true}
                                        onChange={(e)=>{setEditDeleteComment(prev=>{
                                            return {
                                                ...prev,
                                                value:e.target.value
                                            }
                                        })}}/>
                                    <div className="flex gap-4">
                                        <StyledButton width="40%" onClick={handleDelete}>Edit<Edit/> </StyledButton>
                                        <StyledButton width="40%" onClick={handleClose}>Cancel<Cancel/></StyledButton>
                                    </div>
                                </div>
                            }
                            
                        </MyModal>
                        
                        <MyInfiniteScroll fetchFunc={fetchAllComments} setData={setAllComments} items={allComments} enabled={enabled} queryKey={queryKey}>
                            <div className='grid md:grid-cols-2 row-auto gap-10'>
                                {
                                    allComments.length> 0 &&
                                    allComments.map((comment)=>{
                                        const canEditOrDelete = (comment.user && comment.user._id === userId) || isAdmin                                            
                                        return (
                                            <div key={comment._id} className='flex flex-col gap-4 border shadow-md py-4 px-2 rounded-md'>
                                                <h3 className='font-bold'><span className='mr-4 text-red-600'>Post Title:</span>{comment?.post?.title}</h3>
                                                <p className='font-bold'><span className='mr-4 text-red-600'>Comment:</span>{comment.message}</p>
                                                <p><span className='mr-4 text-red-600'>Commented By:</span>{comment.fullName}</p>
                                                <p><span className='mr-4 text-red-600'>Created Date:</span> <i>{formatCreatedDate(comment.createdAt)}</i></p>
                                                <p><span className='mr-4 text-red-600'>Is Deleted:</span>{comment.isDeleted ? 'Yes':'No'}</p>
                                                {
                                                    canEditOrDelete && !comment.isDeleted &&
                                                    <>
                                                        <div className='flex gap-2'>
                                                            <StyledButton onClick={()=>showModal(comment._id, comment.message, 'edit')}>Edit comment<Edit/></StyledButton>
                                                            <StyledButton width="w-full" onClick={()=>showModal(comment._id, comment.message, 'delete')}>
                                                                Delete Post<DeleteForever/>
                                                            </StyledButton>
                                                            
                                                        </div>
                                                    </>
                                                    
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </MyInfiniteScroll>
                    </>
                }
            </div>
        </section>
    )
}

export default ViewAllComments