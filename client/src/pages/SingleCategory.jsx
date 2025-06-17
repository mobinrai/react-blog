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
import DisplayMessage from '../components/DisplayMessage'
import { ReadMore } from '@mui/icons-material'
import Loading from '../components/Loading'
import RightAside from '../components/RightAside'
import { formatCreatedDate } from '../../utils/dates'

const SingleCategory = () => {
    const {slug} = useParams()
    const [allPost, setAllPost] = useState([])
    const {isPending, isError, data, error} = useFetchCategoryBySlug(slug)   
    
    if(isPending){
        return <Loading/>
    }

    if (isError) {
        return <DisplayMessage message={`Error: ${error.message}`}/>
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
            <div className='max-w-6xl mx-auto px-6 my-6 flex gap-4'>
                <div className="w-2/3">
                <MyInfiniteScroll fetchFunc={fetchCategoryPosts} setData={setAllPost} items={allPost} queryKey={['CategoryPost', data._id]}>
                    <div className='grid md:grid-cols-2 row-auto gap-2'>
                        {
                            allPost.length > 0 &&
                            allPost.map((item)=> {
                                
                                return <div key={item._id} className="border pb-4 h-fit shadow-lg">
                                        <PostImage 
                                        to={`/blog/${item.slug}`} 
                                        path={item.mainImg?.filePath} 
                                        alt={item.mainImg?.filePath}
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
                                            authorName={item.user?.username}
                                            authorLink={item.user?.username}
                                            />
                                            <p>{item.desc}</p>
                                            <StyledButton><a href={`/blog/${item.slug}`} className='w-full' title='Read more'>Read More <ReadMore/></a></StyledButton>
                                        </div>
                                    </div> 
                            })
                        }
                    </div>
            </MyInfiniteScroll>
                </div>
            <div className="w-1/3">
            <RightAside/>
            </div>
            </div>
            
        </section>
    )
}

export default SingleCategory