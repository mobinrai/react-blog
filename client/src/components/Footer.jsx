import React from 'react'
import StyledButton from './StyledButton'
import { NotificationsActive } from '@mui/icons-material'
import NewsLetterForm from './NewsLetterForm'

const Footer = () => {
  return (
    <section className="footer-section max-w-6xl mx-auto px-4 flex flex-col gap-4 text-white">
        <div className="top-wrapper px-4 flex flex-col md:flex-row gap-8">
            <div className="left-widget md:flex-1">
                <a href="http://" className='text-3xl font-bold'>MyBl<span className="text-[#ee4276]">o</span>g</a>
                <p className='mt-10'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, reiciendis?</p>
                
            </div>
            <div className="middle-widget md:flex-1">
                <h3 className='text-white font-bold  uppercase dark:text-black'>categories</h3>
                <ul className="list-unstyled font-bold">
                    <li className='py-3.5 border-b'>
                        <a href="#" className='block uppercase hover:text-[#ee4276] transition-all duration-[0.2s]'>Lifestyle <span className='float-right text-[14px] text-[#97989b]'>412</span></a>
                    </li>
                    <li className='py-3.5 border-b'>
                        <a href="#" className='block uppercase hover:text-[#ee4276] transition-all duration-[0.2s]'>Fashion <span className='float-right text-[14px] text-[#97989b]'>412</span></a>
                    </li>
                    <li className='py-3.5 border-b'>
                        <a href="#" className='block uppercase hover:text-[#ee4276] transition-all duration-[0.2s]'>Technology <span className='float-right text-[14px] text-[#97989b]'>412</span></a>
                    </li>
                    <li className='py-3.5 border-b'>
                        <a href="#" className='block uppercase hover:text-[#ee4276] transition-all duration-[0.2s]'>Lifestyle <span className='float-right text-[14px] text-[#97989b]'>412</span></a>
                    </li>
                </ul>
            </div>
            <div className="middle-right-widget md:flex-1">
                <h3 className='text-white font-bold uppercase mb-6 dark:text-black'>tags</h3>
                <ul className="tags-widget mt-3 ">
                    <li className='inline-block mr-1 mb-4'><a href="http://" className='bg-[#323335] uppercase p-2 font-bold text-xs transition-all duration-200 hover:bg-[#ee4266] hover:text-white'>Social</a></li>
                    <li className='inline-block mr-1 mb-4'><a href="http://" className='bg-[#323335] uppercase p-2 font-bold text-xs transition-all duration-200 hover:bg-[#ee4266] hover:text-white'>Travel</a></li>
                    <li className='inline-block mr-1 mb-4'><a href="http://" className='bg-[#323335] uppercase p-2 font-bold text-xs transition-all duration-200 hover:bg-[#ee4266] hover:text-white'>Technology</a></li>
                    <li className='inline-block mr-1 mb-4'><a href="http://" className='bg-[#323335] uppercase p-2 font-bold text-xs transition-all duration-200 hover:bg-[#ee4266] hover:text-white'>Lifestyle</a></li>
                    <li className='inline-block mr-1 mb-4'><a href="http://" className='bg-[#323335] uppercase p-2 font-bold text-xs transition-all duration-200 hover:bg-[#ee4266] hover:text-white'>Food</a></li>
                    <li className='inline-block mr-1 mb-4'><a href="http://" className='bg-[#323335] uppercase p-2 font-bold text-xs transition-all duration-200 hover:bg-[#ee4266] hover:text-white'>Social</a></li>
                    <li className='inline-block mr-1 mb-4'><a href="http://" className='bg-[#323335] uppercase p-2 font-bold text-xs transition-all duration-200 hover:bg-[#ee4266] hover:text-white'>Social</a></li>
                    <li className='inline-block mr-1 mb-4'><a href="http://" className='bg-[#323335] uppercase p-2 font-bold text-xs transition-all duration-200 hover:bg-[#ee4266] hover:text-white'>Social</a></li>
                    <li className='inline-block mr-1 mb-4'><a href="http://" className='bg-[#323335] uppercase p-2 font-bold text-xs transition-all duration-200 hover:bg-[#ee4266] hover:text-white'>Social</a></li>
                    <li className='inline-block mr-1 mb-4'><a href="http://" className='bg-[#323335] uppercase p-2 font-bold text-xs transition-all duration-200 hover:bg-[#ee4266] hover:text-white'>Social</a></li>
                </ul>
            </div>
            {/* <div className="right-widget md:flex-1">
                <h3 className='text-white font-bold uppercase mb-6 dark:text-black'>newsletter</h3>
                <NewsLetterForm/>
            </div> */}
        </div>
        <div className="bottom-wrapper px-4 pt-5 mt-8 flex flex-col gap-4 md:justify-between md:flex-row-reverse border-t">
            <nav id="footer-menu" className="flex flex-wrap gap-4 pt-5 md:pt-0">
                <a href="http://" className='capitalize hover:text-[#ee4266] transition-colors duration-200'>home</a>
                <a href="http://" className='capitalize hover:text-[#ee4266] transition-colors duration-200'>about us</a>
                <a href="http://" className='capitalize hover:text-[#ee4266] transition-colors duration-200'>contact</a>
                <a href="http://" className='capitalize hover:text-[#ee4266] transition-colors duration-200'>advertise</a>
                <a href="http://" className='capitalize hover:text-[#ee4266] transition-colors duration-200'>privacy</a>
            </nav>
            <p>
            Copyright &copy;{new Date().getFullYear()} All rights reserved
            </p>
        </div>
    </section>
  )
}

export default Footer