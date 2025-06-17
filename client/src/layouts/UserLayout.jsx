import React from 'react'
import PageMainTitle from '../components/PageMainTitle'
import { Outlet } from 'react-router-dom'
import useAuthUser from '../hooks/useAuthUser'

const UserLayout = () => {
    const {isAdmin} = useAuthUser()
    return (
        <section className="user-dashboard">
            <PageMainTitle title={'Dashboard'}/>
            <div className="max-w-6xl mx-auto py-6 flex flex-col md:flex-row gap-4">
                <aside className='flex flex-col gap-4 border-r px-4 md:w-[25%] font-semibold'>
                    <a href="/user/dashboard" className='border-b pb-3 capitalize hover:text-[#ee4276] transition-all'>
                        dashboard
                    </a>
                    <a href="/user/all-post" className='border-b pb-3 capitalize hover:text-[#ee4276] transition-all'>
                        view all post
                    </a>
                    {
                        isAdmin && (
                            <>
                                <a href="/user/all-categories" className='border-b pb-3 capitalize hover:text-[#ee4276] transition-all'>
                                    view all categories
                                </a>
                            </>
                        )
                    }
                    <a href="/user/all-comments" className='border-b pb-3 capitalize hover:text-[#ee4276] transition-all'>
                        view all post comments
                    </a>    
                    <a href="/user/posts/new" className='border-b pb-3 capitalize hover:text-[#ee4276] transition-all'>
                        create post
                        </a>
                    <a href="/user/describe-your-self" className='border-b pb-3 capitalize hover:text-[#ee4276] transition-all'>
                        describe your self
                    </a>
                    <a href="/user/manage-profile" className='border-b pb-3 capitalize hover:text-[#ee4276] transition-all'>
                        Manage Profile
                    </a>                    
                </aside>
                <Outlet/>
            </div>
        </section>
    )
}

export default UserLayout