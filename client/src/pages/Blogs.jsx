import React, { useState } from 'react'
import PostImage from '../components/PostImage'
import MyLink from '../components/MyLink'
import StyledButton from '../components/StyledButton'
import PostMetaData from '../components/PostMetaData'
import axios from 'axios'
import MyInfiniteScroll from '../components/MyInfiniteScroll'
import RightAside from '../components/RightAside'
import { formatCreatedDate } from '../../utils/dates'

const Blogs = () => {
    const [allPost, setAllPost] = useState([])
    const fetchPosts = async (pageParam) => {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`,{
            params: {page:pageParam}
        })
        return res.data
    }
    return (
        <section className='blog-section'>
            <div className="max-w-6xl mx-auto px-6 my-6 flex flex-col md:flex-row gap-4">
                {
                <div className="w-full">
                    <MyInfiniteScroll fetchPosts={fetchPosts} setData={setAllPost} items={allPost} queryKey={['BlogPost']}>
                    <div className='grid md:grid-cols-2 row-auto gap-2'>
                        {
                            allPost.length > 0 &&
                            allPost.map((item)=> {
                                
                                return <div key={item._id} className="border pb-4 h-fit md:max-w-md max-sm:w-full">
                                        <PostImage 
                                        to={`/blog/${item.slug}`} 
                                        path={item.img} 
                                        alt={item.img}
                                        />

                                        <div className="flex flex-col gap-2 p-4">
                                            <MyLink 
                                            to={`/blog/${item.slug}`} 
                                            linkName={item.title} 
                                            className={'text-sm'}
                                            />

                                            <PostMetaData 
                                            createdAt={formatCreatedDate(item.createdAt)}
                                            categoryLink={item.category.slug} 
                                            categoryName={item.category.name} 
                                            authorName={item.user.username}
                                            authorLink={item.user.username}
                                            />
                                            <p>{item.desc}</p>
                                            <StyledButton><a href={`/blog/${item.slug}`} className='w-full'>Read More</a></StyledButton>
                                        </div>
                                    </div> 
                            })
                        }
                    </div>
                </MyInfiniteScroll>
                </div>
            }
            <RightAside/>
            </div>
            
        </section>
    )
}

export default Blogs