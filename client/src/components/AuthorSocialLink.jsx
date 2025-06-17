import React from 'react'
import { Link } from 'react-router-dom'

const AuthorSocialLink = () => {
    return (
        <>
            <li>
                <Link to="https://www.facebook.com" target='_blank' className='text-gray-400 hover:text-[#282299] transition-all duration-[0.2s]' title='facebook'>
                    <i className="fa-brands fa-facebook-f"></i>
                </Link>
            </li>
            <li>
                <Link to="https://x.com" target='_blank' className='text-gray-400 hover:text-[#00adf2] transition-all duration-[0.2s]' title='twitter'>
                    <i className="fa-brands fa-twitter"></i>
                </Link></li>
            <li>
                <Link to="https://www.linkedin.com" target='_blank' className='text-gray-400 hover:text-[#dc4d2d] transition-all duration-[0.2s]' title='google plus'>
                <i className="fa-brands fa-google-plus-g"></i>
                </Link>
            </li>
        </>
    )
}

export default AuthorSocialLink