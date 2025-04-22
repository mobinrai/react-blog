import React from 'react'
import { Link } from 'react-router-dom'
import ImageKit from '../components/ImageKit'

const UnAuthorized = () => {
    return (
        <div className='max-w-6xl mx-auto  px-6 flex flex-col md:flex-row items-center'>
            <ImageKit path='unauthorized.avif' />
            <div className="flex flex-col items-start">
                <h2 className='font-bold text-red-600 text-2xl'>Unauthorized Access</h2>
                <p className='my-6 text-xl'>You are not authorized to view this page.</p>
                <p>Please <a href="/login" className='text-blue-600 underline font-semibold'>Login</a> to access the page.</p>
            </div>
        </div>
    )
}

export default UnAuthorized