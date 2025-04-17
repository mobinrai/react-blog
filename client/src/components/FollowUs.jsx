import React from 'react'

const FollowUs = () => {
    return (
        <>
            <h1 className='font-bold text-xl'>Follow Us</h1>
            <hr className='-mt-4'/>
            <ul className={`follow-us flex gap-2 mb-4`}>
                <li>
                    <a href="http://" className='bg-[#282299] hover:text-black w-10 h-10 text-[14px] flex justify-center items-center text-white rounded-full transition-all duration-[0.2s]' target='_blank'>
                        <i className="fa-brands fa-facebook-f"></i>
                    </a>
                </li>
                <li>
                    <a href="http://" className='bg-[#00adf2] hover:text-black  w-10 h-10 text-[14px] flex justify-center items-center text-white rounded-full transition-all duration-[0.2s]'>
                    <i className="fa-brands fa-twitter"></i>
                    </a>
                </li>
                <li>
                    <a href="http://" className='bg-[#dc4d2d] hover:text-black  w-10 h-10 text-[14px] flex justify-center items-center text-white rounded-full transition-all duration-[0.2s]'>
                    <i className="fa-brands fa-google-plus-g"></i></a>
                </li>
                <li>
                    <a href="http://" className='bg-[#d341b2] hover:text-black w-10 h-10 text-[14px] flex justify-center items-center text-white rounded-full transition-all duration-[0.2s]'>
                    <i className="fa-brands fa-instagram"></i>
                    </a>
                </li>
            </ul>
        </>
    )
}

export default FollowUs