import { TextField } from '@mui/material'
import React from 'react'
import StyledButton from './StyledButton'
import { MailOutlineOutlined, NotificationsActive } from '@mui/icons-material'

const NewsLetterForm = () => {
    return (
        <div className="-mt-2 py-6 px-7 border-dot-bottom border-dot-left border-dot-right relative">
            <MailOutlineOutlined sx={{fontSize:'14rem', transform:'rotate(45deg)', position:'absolute', right:'2rem', zIndex:'-5', color:'#e5e5e5'}}/>
            <p className=''>Never miss a change to read a new blog.</p>
            <form action="" className="flex flex-col gap-6 mt-6 py-3">
                <TextField required id="email" label="Required" defaultValue="Email" fullWidth/>
                <StyledButton icon={<NotificationsActive/>}>Subscribe</StyledButton>
            </form>
        </div>
    )
}

export default NewsLetterForm