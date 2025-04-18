import React, { useState } from 'react'
import { useFetchCategoryBySlug } from '../../queries/CategoryQuery'
import { useParams } from 'react-router-dom'
import PageMainTitle from '../components/PageMainTitle'
import MyInfiniteScroll from '../components/MyInfiniteScroll'
import MyLink from '../components/MyLink'
import PostImage from '../components/PostImage'
import PostMetaData from '../components/PostMetaData'
import StyledButton from '../components/StyledButton'
import axios from 'axios'

const SingleCategory = () => {
    const {slug} = useParams()
    const [allPost, setAllPost] = useState([])
    const {isPending, isError, data, error} = useFetchCategoryBySlug(slug)   
    
    if(isPending){
        return <span>Is Loading...</span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>;
    }

    const fetchCategoryPosts = async (pageParam) => {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`,{
            params: {page:pageParam, category:data._id}
        })
        return res.data
    }
    return (
        <section className='blog-section'>
            <PageMainTitle title={data.name}/>
            <MyInfiniteScroll fetchPosts={fetchCategoryPosts} setData={setAllPost} items={allPost} queryKey={['CategoryPost', data._id]}>
                    <div className='max-w-6xl mx-auto px-6 my-6 grid md:grid-cols-3 row-auto gap-2'>
                        {
                            allPost.length > 0 &&
                            allPost.map((item)=> {
                                let date = new Date(item.createdAt);
                                const day = date.getDate();
                                const month = date.toLocaleString('en-US',{month:'long', year:'numeric'})
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
                                            createdAt={`${day}, ${month}`} 
                                            categoryLink={item.category.slug} 
                                            categoryName={item.category.name} 
                                            authorName={item.user.username}
                                            authorLink={item.user.username}
                                            />
                                            <p>{item.desc}</p>
                                            <StyledButton><a href={`/blog/${item.slug}`}>Read More</a></StyledButton>
                                        </div>
                                    </div> 
                            })
                        }
                    </div>
                </MyInfiniteScroll>
        </section>
    )
}

export default SingleCategory