import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Hero } from '../components/Hero'
import Footer from '../components/Footer'

const MainLayout = () => {
  const {pathname} = useLocation()
  return (
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
  )
}

export default MainLayout