import { InsertComment } from '@mui/icons-material'
import { TextField } from '@mui/material'
import React, { useState } from 'react'
import StyledButton from './StyledButton'
import { isEmptyString, isValidEmail, stringWithSpace } from '../../utils/validation'
import { useUser } from '@clerk/clerk-react'

const CommentForm = ({formRef, inputRef, postId, mutation,replayParentId, setReplayParentId, handleSubmit}) => {
    const [validationError, setValidationError] =useState({})
    const {user} = useUser()
    const loginUserEmail = user?.emailAddresses?.[0].emailAddress
    const validateForm=(event)=>{        
        event.preventDefault();
        const formData = new FormData(event.target)
        const fullName = user?.fullName ? user.fullName : formData.get('fullName').trim()
        const email = loginUserEmail ? loginUserEmail : formData.get('email').trim()
        const website=formData.get('website').trim()
        const message = formData.get('message').trim()
        const errors={}

        if(isEmptyString(fullName)){
            errors.fullName='Full name is required.'
        }

        if(fullName && !stringWithSpace(fullName))
        {
            errors.fullName='Please enter valid full name.'
        }
        if(isEmptyString(email)){
            errors. email='Email is required.'
        }
        if(email && !isValidEmail(email)){
            errors. email='Please enter valid email address.'
        }
        if(isEmptyString(message)){
            errors.message='Message is required.'
        }

        if(Object.keys(errors).length>0){
            setValidationError(errors)
            return false;
        }

        const data = {
            fullName,
            email,
            website,
            message,
            post:postId
        }
        if(replayParentId){
            data.parentId = replayParentId
        }
        handleSubmit(data)
    }

    const handleCancel=()=>{
        setReplayParentId(null)
    }

    return (
        <form ref={formRef} onSubmit={(e)=>validateForm(e)} className='flex flex-col gap-6 mt-6 '>
            <div className="flex gap-2">
                <div className="flex flex-col gap-2 w-1/2">
                    <TextField required id="fullName" inputRef={inputRef} 
                    name='fullName'
                    label={`${user?.firstName ?"":"Full Name"}`}
                    defaultValue={user?.fullName ? user.fullName : ''}
                    disabled={user?.fullName?true:false}
                    fullWidth
                    onFocus={()=>{setValidationError(prev=>(
                        {...prev, fullName:''}))
                        }}/>
                    <span className='text-red-600 text-xs'>{validationError?.fullName}</span>
                </div>
                
                <div className="flex flex-col gap-2 w-1/2">
                    <TextField required id="email" 
                    name='email' 
                    label={`${loginUserEmail?"": "Email"}`} 
                    defaultValue={loginUserEmail ? loginUserEmail: ''}
                    disabled={loginUserEmail?true:false}
                    fullWidth
                    onFocus={()=>{setValidationError(prev=>(
                        {...prev, email:''}))
                        }}/>
                    <span className='text-red-600 text-xs'>{validationError?.email}</span>
                </div>
            </div>
                <div className="flex flex-col gap-2">
                    <TextField id="website"
                    name='website' 
                    label="Website" 
                    defaultValue=""
                    aria-label='website' 
                    fullWidth
                    onFocus={()=>{setValidationError(prev=>(
                        {...prev, website:''}))
                        }}/>
                    <span className='text-red-600 text-xs'>{validationError?.webiste}</span>
                </div>
                
                <div className="flex flex-col gap-2">
                    <TextField multiline name='message' minRows={5} label="Required" required
                    onFocus={()=>{setValidationError(prev=>(
                        {...prev, message:''}))
                        }}/>
                    <span className='text-red-600 text-xs'>{validationError?.message}</span>
                </div>
                
                <div className="flex gap-4">
                <StyledButton width="30%" icon={<InsertComment/>} type="submit" disabled={mutation.isPending}>Post comment</StyledButton>
                {
                    replayParentId && 
                    <StyledButton width="30%" type="button" onClick={handleCancel}>Cancel comment</StyledButton>
                }
            </div>
        </form>
    )
}

export default CommentForm