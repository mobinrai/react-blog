import { SignedIn, SignedOut, useAuth, useClerk, UserButton, useUser } from '@clerk/clerk-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import MainCategories from './MainCategories'
import {Menu, Close, AccountCircle, Settings, ExitToApp} from '@mui/icons-material'

export const Navbar = () => {
    const [openMenu, setOpenMenu] = useState(false)
    const [dropDownMenu, setDropDownMenu] = useState(false)
    const queryParams = new URLSearchParams(location.search);
    const [showProfilePop, setShowProfilePop] = useState(false)
    const { signOut } = useClerk()
    const redirectUrl = queryParams.get('redirectUrl') || '/';
    const {getToken} = useAuth()
    const {user} = useUser()

    useEffect(()=>{
        getToken().then(token=>{ console.log(token);})
    },[])

    const handleSignOutClick = ()=>{
        setShowProfilePop(!showProfilePop)
        signOut({ redirectUrl: '/' })
    }
    const handleProfileClick = ()=>{
        setShowProfilePop(!showProfilePop)
    } 
    return (
        <>
            <div className='pt-4 md:block relative'>
                <div className='max-w-6xl mx-auto pb-2'>
                    <div className='navtop flex items-center justify-between px-4'>
                        <div className='nav-logo'>
                        <Link to='' className='text-3xl font-bold'>
                            MyBl<span className='text-[#ee4276]'>o</span>g
                        </Link>
                        
                        </div>
                        <div className='hidden md:flex items-center gap-4'>
                        <nav className='' id='main-menu' aria-label='main'>
                            <ul className='py-6 flex items-center gap-4'>
                            <li>
                                <Link
                                to='/'
                                className='font-semibold text-base hover:text-[#ee4276] uppercase tracking-wider'
                                >
                                Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                to='/blogs'
                                className='font-bold text-base hover:text-[#ee4276] uppercase tracking-wider'
                                >
                                Blogs
                                </Link>
                            </li>
                            <li>
                                <Link
                                to='/contact'
                                className='font-bold text-base hover:text-[#ee4276] uppercase tracking-wider'
                                >
                                Contact
                                </Link>
                            </li>
                            <li>
                                <Link
                                to='/about'
                                className='font-bold text-base hover:text-[#ee4276] uppercase tracking-wider'
                                >
                                About
                                </Link>
                            </li>
                            {
                                user &&
                                <>
                                    <li>
                                        <Link
                                        to='/create-blog'
                                        className='font-bold text-base hover:text-[#ee4276] uppercase tracking-wider'
                                        >
                                        Create Blog
                                        </Link>
                                    </li>
                                    <li className='relative'>
                                        <div className="flex gap-2 items-center">
                                            <span className='text-sm font-semibold'>{user.fullName}</span>
                                            <img src={user.imageUrl} alt="" srcSet="" className='rounded-full w-7 cursor-pointer' onClick={handleProfileClick}/>
                                        </div>
                                        {showProfilePop && (
                                            <div className="absolute mt-4 w-80 -left-44 p-4 dark:text-black bg-white rounded shadow-lg border z-10">
                                                <ul className="flex flex-col gap-4">
                                                <li className="border-b p-2">
                                                    <Link
                                                        to='/user/dashboard'
                                                        className='text-sm font-semibold hover:text-[#ee4276] uppercase tracking-wider'
                                                        onClick={()=>setShowProfilePop(!showProfilePop)}
                                                        >
                                                            <AccountCircle/> Dashboard
                                                    </Link>
                                                </li>
                                                <li className="border-b p-2">
                                                    <Link
                                                        to='/user/manage-profile'
                                                        className='text-sm font-semibold hover:text-[#ee4276] uppercase tracking-wider'
                                                        onClick={()=>setShowProfilePop(!showProfilePop)}
                                                        >
                                                           <Settings/> Manage Profile
                                                    </Link>
                                                </li>
                                                <li className="border-b p-2">
                                                    <button
                                                        type='button'
                                                        className='text-sm font-semibold hover:text-[#ee4276] uppercase tracking-wider'
                                                        onClick={handleSignOutClick}
                                                        >
                                                            <ExitToApp/> SignOut
                                                    </button>
                                                </li>
                                                </ul>
                                            </div>
                                        )}
                                    </li>
                                </>
                            }
                            {
                                !user && 
                                <li>
                                    <SignedOut>
                                        <Link to='/login' className=''>
                                            <button className='rounded-3xl bg-gray-400 text-white py-2 px-4 font-bold'>
                                                Login
                                            </button>
                                        </Link>
                                    </SignedOut>
                                </li>

                            }
                            {openMenu && (
                                <MainCategories className='flex gap-4 items-start' />
                            )}
                            </ul>
                        </nav>
                        
                        
                        </div>
                    </div>
                    <Menu className='invisible max-md:visible absolute right-5 top-5' onClick={()=>setOpenMenu((prev)=>!prev)}/>
                </div>
                <div className='border-t md:border-b border-[#e8eaed] py-2'>
                    <div className='hidden md:block nav-bottom max-w-6xl mx-auto px-4 py-4'>
                        <MainCategories className='flex gap-4 items-start' />
                    </div>
                </div>
                
                {
                    openMenu &&
                    <>
                        <nav className="flex justify-end gap-4 fixed w-full z-40 top-0 right-0 bottom-0 bg-opacity-80 bg-black text-white animate-slide-in" id='mobile-menu' aria-label='main'>
                        <Close className='fixed right-6 top-5' onClick={()=>setOpenMenu(prev=>!prev)}/>
                            
                            <ul className='pl-6 flex flex-col w-1/2  bg-black justify-center gap-4'>
                                <li className="border-b p-1">
                                    <SignedOut>
                                        <Link to='/login' className=''>
                                        <button className='rounded-3xl bg-gray-400 text-white py-2 px-4 font-bold'>
                                            Login
                                        </button>
                                        </Link>
                                    </SignedOut>
                                    <SignedIn>
                                        <UserButton>
                                            <UserButton.MenuItems>
                                                <UserButton.Link label='My Dashboard' labelIcon={<AccountCircle/>}href='/user/dashboard'/>
                                            </UserButton.MenuItems>
                                        </UserButton>
                                    </SignedIn>
                                </li>
                                <li className='border-b p-1'>
                                    <Link
                                    to='/'
                                    className='font-semibold text-base hover:text-[#ee4276] uppercase tracking-wider'
                                    onClick={()=>setOpenMenu(prev=>!prev)} >
                                    Home
                                    </Link>
                                </li>
                                <li className='border-b p-1'>
                                    <Link
                                    to='/blogs'
                                    className='font-bold text-base hover:text-[#ee4276] uppercase tracking-wider'
                                    onClick={()=>setOpenMenu(prev=>!prev)} >
                                    Blogs
                                    </Link>
                                </li>
                                <li className='border-b p-1'>
                                    <Link
                                    to='/contact'
                                    className='font-bold text-base hover:text-[#ee4276] uppercase tracking-wider'
                                    onClick={()=>setOpenMenu(prev=>!prev)} >
                                    Contact
                                    </Link>
                                </li>
                                <li className='border-b p-1'>
                                    <Link
                                    to='/about'
                                    className='font-bold text-base hover:text-[#ee4276] uppercase tracking-wider'
                                    onClick={()=>setOpenMenu(prev=>!prev)} >
                                    About
                                    </Link>
                                </li>
                                <li className='border-b p-1'>
                                    <a className='font-bold block  w-full' onClick={()=>setDropDownMenu(prev=>!prev)}>Categories</a>                    
                                </li>
                                {
                                    dropDownMenu && <MainCategories className='flex flex-col gap-4 items-start pl-4' />
                                }
                            </ul>
                        </nav>
                    </>
                }
            </div>
        </>
    )
}
