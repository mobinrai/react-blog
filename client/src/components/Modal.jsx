import { Box } from '@mui/material'
import React, { useState } from 'react'
import StyledButton from './StyledButton'
import { Check, Clear } from '@mui/icons-material'

const Modal = ({handleClick, openModal, setOpenModal}) => {
        
    const handleClose = ()=>{
        setOpenModal(false)
    }
    return (
        <>
            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="are you sure"
                sx={{
                    backgroundbackgroundColor: 'rgb(0 0 0 / 22%)',
                }}
            >
                <Box>
                <h2 id="parent-modal-title" className='text-center'>Are you sure you want to delete this post? </h2>
                <div className="flex justify-center gap-4 mt-6">
                    <StyledButton width="40%" onClick={handleClick}>Yes<Check/> </StyledButton>
                    <StyledButton width="40%" onClick={handleClose}>No<Clear/></StyledButton>
                </div>
                </Box>
            </Modal>
                {/* {
                    user && item.user?.username === user?.username &&
                    <>
                        
                        <StyledButton width="40%"><a href={`/edit-post/${item.slug}`} className='w-full'>Edit Post</a></StyledButton>
                        <StyledButton width="40%" onClick={()=>handleDelete(item._id, item.title)}>Delete Post<DeleteForever/></StyledButton>
                    </>
                } */}
        </>
            
    )
}

export default Modal