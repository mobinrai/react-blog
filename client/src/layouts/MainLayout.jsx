import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Hero } from '../components/Hero'
import Footer from '../components/Footer'
import NoInternetConnection from '../error_pages/NoInternetConnection'

const MainLayout = () => {
    const {pathname} = useLocation()
    const ikUrl = import.meta.env.VITE_IK_URL_ENDPOINT
    const ikPublicKey = import.meta.env.VITE_IK_PUBLIC_KEY
    const clerkPublishKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
    const apiUrl = import.meta.env.VITE_API_URL
    const [errors, setErrors] = useState({})
    const [isOffline, setIsOffline] = useState(!navigator.onLine)

    useEffect(() => {
        
        if(!ikUrl || ikUrl ===''){
            setErrors({ikUrl:'Image kit url is missing or not set.'})
        }

        if(!ikPublicKey || ikPublicKey ===''){
            setErrors(prev=>({
                ...prev,
                ikPublicKey:'Image kit public is missing or not set.'}
            ))
        }
        
        if(!clerkPublishKey || clerkPublishKey ===''){
            setErrors(prev=>({
                ...prev,
                clerkPublishKey:'Clerk publish key is missing or not set.'}
            ))
        }

        if(!apiUrl || apiUrl ===''){
            setErrors(prev=>({
                ...prev,
                apiUrl:'API url is missing or not set.'}
            ))
        }
    }, [])

    useEffect(()=>{
        const checkInternetConnection = async()=>{
            try{
                const controller = new AbortController()
                const timeOutId = setTimeout(()=> controller.abort(), 3000)
                const res = await fetch('https://www.google.com/favicon.ico',{
                    method:'HEAD',
                    mode:'no-cors',
                    signal:controller.signal
                })
                clearTimeout(timeOutId)
                setIsOffline(false)

            }catch(e){
                setIsOffline(true)
            }
        }
        
        if (!navigator.onLine) {
            
            setIsOffline(true)
        }

        const handleOffline = () => {
            setIsOffline(true)
        }
        
        const handleOnline = ()=>{
            setIsOffline(false)    
        }
        
        window.addEventListener('online', handleOnline)
        window.addEventListener('offline', handleOffline)
        checkInternetConnection()

        return () => {
            window.removeEventListener('online', handleOnline)
            window.removeEventListener('offline', handleOffline)
        }
    }, [])
    
    return (
        <>
        {
            isOffline
            ?
            <NoInternetConnection/>
            :
            Object.keys(errors).length > 0 ?
            <div className='flex flex-col justify-center items-center h-svh font-bold'>
                <h4 className='text-4xl'>Please, add/ the values in the .env file for missing names.</h4>
                <br />
                <ul>
                    {
                        Object.values(errors).map(name=>{
                            return <li className='text-red-600'>{name}</li>
                        })
                    }   
                </ul>
                
            </div>
            :
            <>
                <header className="header" id="header">
                    <Navbar/>
                </header>
                {
                pathname =='/' && <Hero/>
                }        
                <main id="main" className="">
                    <Outlet/>
                </main>
                <footer className="bg-[#d5d5d5] mt-10 pt-20 pb-10 dark:bg-gray-700">
                    <Footer/>
                </footer>
            </>
        }
            
        </>
    )
}

export default MainLayout