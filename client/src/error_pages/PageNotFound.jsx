import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const PageNotFound = () => {
    const {pathname} = useLocation()
    return (
        <section className='page-not-found bg-[#fafbfd]'>
            <div className='max-w-6xl mx-auto px-4 flex justify-center h-full'>
                <div className='fixed top-1/3'>
                    <p className='font-bold text-7xl mb-4'>OO<span className='text-[#ee4276]'>P</span>SS!!</p>
                    <h3 className='font-bold mb-4'>Error 404: Page you are looking for can not be found.
                    </h3>
                    <Link to={'/'} className='border-red-500 p-2 mt-4 border-2 font-semibold hover:bg-red-500 hover:text-white'>
                        Go Home
                    </Link>
                </div>
                
            </div>
        </section>
    )
}

export default PageNotFound