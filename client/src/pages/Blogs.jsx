import React from 'react'
import PageMainTitle from '../components/PageMainTitle'
import PostImage from '../components/PostImage'
import MyLink from '../components/MyLink'
import StyledButton from '../components/StyledButton'
import PostMetaData from '../components/PostMetaData'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const fetchPost = async ()=>{
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`)
    return res.data
}

const Blogs = () => {
    const { isPending, isError, data, error } = useQuery({
        queryKey: ['posts'],
        queryFn: fetchPost,
    })
    
    if (isPending) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }
  return (
    <section className='blog-section'>
        <PageMainTitle title={'Blogs'}/>
        <div className="max-w-6xl mx-auto px-6 my-6 grid md:grid-cols-3 row-auto gap-2">
        {
            data.map((item)=>(          
                <div key={item._id} className="border pb-4 h-fit max-w-md">
                    <PostImage path={item.img ?? 'default-image.jpg'} alt={'default image'} width={500}/>
                    <div className="flex flex-col gap-2 p-4">
                        <MyLink to={`/${item.slug}`} linkName={item.title} className={'text-sm'}/>
                        <PostMetaData createdAt={item.createdAt} categorySlug={'category-1'} categoryName={item.categoryId} authorName={item.userId}/>
                        <p>{item.desc}</p>
                        <StyledButton><a href={`/${item.slug}`}>Read More</a></StyledButton>
                    </div>
                </div> 
                
            ))
        }
        </div>
    </section>
  )
}

export default Blogs