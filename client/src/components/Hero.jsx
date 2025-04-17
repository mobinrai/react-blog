import React from 'react'
import ImageKit from './ImageKit';
import PostListItem from './PostListItem';

export const Hero = () => {
    const date = new Date()
    const monthAndYear = date.toLocaleString('en-us', { month: 'long', year: 'numeric' });
    return (
        <section className='hero-section max-w-6xl mx-auto flex gap-2 items-start flex-col md:flex-row px-4 sm:justify-stretch mt-7'>
            <div className="md:w-2/3 w-full">
                <div className="post-thumb relative">
                    <a href="http://" className='relative after:content-empty after:absolute after:left-0 after:right-0 after:top-0 after:bottom-0 after:bg-[rgba(27,28,30,36%)] overflow-hidden group block'>
                    <ImageKit path="default-image.jpg" className='w-full transition-transform ease-in duration-1000 group-hover:scale-110'/>
                    </a>
                    <div className="post-desc absolute bottom-[3em] left-3">
                        <span className='text-red-700 font-bold'>Lifestyle</span>
                        <h3 className='text-white fond-semibold md:max-md:text-2xl text-xl'>
                            <a href="http://" className='hover:text-[#ee4266] transition-colors duration-1000 '>Lorem ipsum dolor sit amet consectetur adipisicing elit.</a>
                        </h3>
                        <ul className='flex gap-4'>
                            <li className='text-white'><a href="http://">Author Name</a></li>
                            <li className='text-white'>{date.getDate() + ' ' + monthAndYear}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="flex gap-2 flex-col md:flex-1 h-auto">
                <div className="post-thumb relative">
                    <a href="http://" className='relative after:content-empty after:absolute after:left-0 after:right-0 after:top-0 after:bottom-0 after:bg-[rgba(27,28,30,36%)] overflow-hidden group block'>
                        <img src="images/hot-post-3.webp" className='transition-transform ease-in duration-700 group-hover:scale-[1.1]' alt="" srcSet="" />
                    </a>
                    <div className="post-desc absolute bottom-[1rem] left-2">
                        <span className='text-red-700 font-bold'>SubTitle</span>
                        <h3 className='text-white text-[18px] font-semibold'>
                            <a href="http://" className='hover:text-[#ee4266] transition-colors duration-1000 max-lg:md:text-[15px]'>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</a></h3>
                        <ul className='flex gap-4'>
                            <li className='text-white'><a href="http://">Author Name</a></li>
                            <li className='text-white'>{date.getDate() + ' ' + monthAndYear}</li>
                        </ul>
                    </div>
                </div>
                {/* <PostListItem/> */}
                <div className="post-thumb relative">
                    <a href="http://" className='relative after:content-empty after:absolute after:left-0 after:right-0 after:top-0 after:bottom-0 after:bg-[rgba(27,28,30,36%)] overflow-hidden group block'>
                        <img src="images/hot-post-4.jpeg" className='transition-transform ease-in duration-700 group-hover:scale-[1.1]' alt="" srcSet="" />
                    </a>
                    <div className="post-desc absolute bottom-[1rem] left-2">
                        <span className='text-red-700 font-bold'>SubTitle</span>
                        <h3 className='text-white text-[18px] font-semibold sm:max-md:text-xl'>
                            <a href="http://" className='hover:text-[#ee4266] transition-colors duration-1000 max-lg:md:text-[15px]'>Loremsdfasf ipsum dolor, sdfasdf sit amet consectetur adipisicing elit.</a></h3>
                        <ul className='flex gap-4'>
                            <li className='text-white'><a href="http://">Author Name</a></li>
                            <li className='text-white'>{date.getDate() + ' ' + monthAndYear}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}
