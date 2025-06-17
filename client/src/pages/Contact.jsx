import React, { useRef, useState } from 'react'
import SectionTitleWithLine from '../components/SectionTitleWithLine'
import { Email, Phone, Place, Send } from '@mui/icons-material'
import { red } from '@mui/material/colors'
import { TextField } from '@mui/material'
import StyledButton from '../components/StyledButton'
import PageMainTitle from '../components/PageMainTitle'
import RightAside from '../components/RightAside'
import { isEmptyString, isValidEmail } from '../../utils/validation'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'react-toastify'

const Contact = () => {
    const formRef = useRef(null)
    const [isDisabled, setIsDisabled] = useState(false)
    const [validationErrors, setValidationErrors] = useState({})
    const mutation = useMutation({
        mutationFn: (formData)=>{
            return axios.post(`${import.meta.env.VITE_API_URL}/messages`, formData)
        },onSuccess:(data)=>{
            formRef?.current?.reset()
            setIsDisabled(false)
            toast.success(data?.data)
        }, onError:(error)=>{
            setIsDisabled(false)
            toast.error(error)
        }
        
    })
    const handleSubmit = (e)=>{
        e.preventDefault()
        setIsDisabled(!isDisabled)
        const formData = new FormData(e.target)
        const email = formData.get('email').trim()
        const subject = formData.get('subject').trim()
        const message = formData.get('message')
        const errors = {}
        if(isEmptyString(email)){
            errors.email = 'Please enter your email address.'
        }
        if(isEmptyString(subject)){
            errors.subject= 'Please enter your message subject.'
        }
        if(isEmptyString(message)){
            errors.message ='Please enter your message.'
        }
        if(email && !isValidEmail(email)){
            errors.email = 'Please enter valid email address.'
        }
        if(Object.keys(errors).length>0){
            setIsDisabled(false)
            setValidationErrors(errors)
            return
        }
        mutation.mutate({email, subject,  message})
    }
    return (
        <section className='contact-section'>
            <PageMainTitle title={'Contact Us'}/>
            <div className="max-w-6xl mx-auto px-2.5 flex flex-col md:flex-row max-md:gap-10 gap-4 my-8">
                <div className='w-full md:w-2/3'>
                    <div className="contact-info-sectio my-4">
                        <SectionTitleWithLine divClassName={'mb-4'} title={'Contact Information'}/>
                        <address className='not-italic flex flex-col gap-6'>
                            <p>
                                <span className="rounded-full border p-2 my-2 mr-6"><Phone sx={{ color: red[500] }} fontSize='small'/></span>
                                <a href="tel:+012025550194">202-555-0194</a>
                            </p>
                            <p>
                                <span className="rounded-full border p-2  my-2 mr-6"><Email sx={{ color: red[500] }} fontSize='small'/></span>
                                <a href="mailto:infos@myblog.co">Infos@myblog.co</a>
                            </p>
                            <p>
                                <span className="rounded-full border p-2  my-2 mr-6"><Place sx={{ color: red[500] }} fontSize='small'/></span>
                                 123 6th St.Melbourne, FL 32904
                            </p>
                        </address>
                    </div>
                    <div className='contact-form-section my-7 dark:bg-[#ecf0f1] p-4'>
                        <SectionTitleWithLine headingClassName='dark:bg-[#ecf0f1]' title={'Mail us'}/>
                        <form onSubmit={handleSubmit} ref={formRef} className="flex flex-col gap-6 mt-6">
                            <div>
                                <TextField 
                                required 
                                id="email" 
                                name='email' 
                                label="Email" 
                                fullWidth
                                onFocus={()=>{setValidationErrors(prev=> ({...prev, email:''}))}}/>
                                <span className='text-xs text-red-600'>{validationErrors?.email}</span>
                            </div>
                            <div>
                                <TextField 
                                required 
                                id="subject" 
                                name='subject' 
                                label="Subject" 
                                fullWidth
                                onFocus={()=>{setValidationErrors(prev=> ({...prev, subject:''}))}}/>
                                <span className="text-xs text-red-600">
                                    {validationErrors?.subject}
                                </span>
                            </div>
                            <div>
                                <TextField multiline minRows={3} name='message' label="Message *"
                                onFocus={()=>{setValidationErrors(prev=> ({...prev, message:''}))}}/>
                                <span className="text-xs text-red-600">
                                    {validationErrors.message}
                                </span>
                            </div>
                            <StyledButton type='submit' width="30%" icon={<Send/>} disabled={isDisabled}>Submit</StyledButton>
                        </form>
                    </div>
                </div>
                <div className='w-1/3'>
                    <RightAside/>
                </div>
                
            </div>
        </section>    
    )
}

export default Contact