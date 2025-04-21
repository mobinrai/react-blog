import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PostImage from '../components/PostImage'
import MyLink from '../components/MyLink'
import StyledButton from '../components/StyledButton'
import MyInfiniteScroll from '../components/MyInfiniteScroll'
import PostMetaData from '../components/PostMetaData'
import axios from 'axios'
import { formatCreatedDate } from '../../utils/dates'
import { useAuth, useUser } from '@clerk/clerk-react'
import { Check, Clear, DeleteForever, ReadMore } from '@mui/icons-material'
import { Box, Modal } from '@mui/material'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

const Author = () => {
    const [openModal, setOpenModal] = useState(false)
    const [allPost, setAllPost] = useState([])
    
    const fetchPosts = async (pageParam) => {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`,{
            params: {page:pageParam}
        })
        return res.data
    }
    
    return (
        <>
            <div className="w-full bg-[#1b1c1e] dark:bg-white text-white pt-32 pb-20 relative top-0 flex justify-center items-center mt-4">
                <div className="max-w-4xl mx-auto px-2.5 flex flex-col items-center justify-center text-center">
                    <img src={`${allPost?.[0]?.user?.img}`} alt={`${allPost?.[0]?.user?.fullName} profile pic`} srcSet="" className='mb-4 rounded-[50%] w-24'/>
                    <h1 className='text-3xl my-3'></h1>
                    <div className="author-desc">
                        <p className='text-xl'>
                            Little about author's experience,passion,work and social status...
                        </p>
                        <ul className="author-social-list flex justify-center gap-4 mt-4">
                            <li>
                                <Link to="/blogs" className='text-gray-400 hover:text-[#282299] transition-all duration-[0.2s]' title='facebook'>
                                    <i className="fa-brands fa-facebook-f"></i>
                                </Link>
                            </li>
                            <li>
                                <Link to="/blogs" className='text-gray-400 hover:text-[#00adf2] transition-all duration-[0.2s]' title='twitter'>
                                    <i className="fa-brands fa-twitter"></i>
                                </Link></li>
                            <li>
                                <Link to="/blogs" className='text-gray-400 hover:text-[#dc4d2d] transition-all duration-[0.2s]' title='google plus'>
                                <i className="fa-brands fa-google-plus-g"></i>
                                </Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="max-w-6xl mx-auto my-4 px-4">
                
                <MyInfiniteScroll fetchPosts={fetchPosts} setData={setAllPost} items={allPost} queryKey={['BlogPost']}>
                    <div className='flex flex-col gap-4 w-full'>
                        {
                            allPost.length > 0 &&
                            allPost.map((item)=> {
                                return <div key={item._id} className="flex flex-col md:flex-row gap-4 w-full">
                                        <div>
                                            <PostImage 
                                            to={`/blog/${item.slug}`} 
                                            path={item.img} 
                                            alt={item.img}
                                            width={400} imageClass={'max-w-none'}
                                            />
                                        </div>

                                        <div className="flex flex-col gap-4 w-full">
                                            <MyLink 
                                            to={`/blog/${item.slug}`} 
                                            linkName={item.title}
                                            />

                                            <PostMetaData 
                                            createdAt={formatCreatedDate(item.createdAt)} 
                                            categoryLink={item.category.slug} 
                                            categoryName={item.category.name}
                                            dontShowIcon={true}
                                            />
                                            <p>{item.desc}</p>
                                            <div className="flex gap-4">
                                                <StyledButton width="40%"><a href={`/blog/${item.slug}`} className='w-full' title='Read more'>Read More <ReadMore/></a></StyledButton>  
                                            </div>
                                        </div>
                                    </div> 
                            })
                        }
                    </div>
                </MyInfiniteScroll>
            </div>
        </>
    )
}

export default Author