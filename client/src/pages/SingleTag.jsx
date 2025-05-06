import React from 'react'
import { Link, useParams } from 'react-router-dom'
import useFetchPost from '../hooks/useFetchPost'
import MyInfiniteScroll from '../components/MyInfiniteScroll'
import ImageKit from '../components/ImageKit'
import { Person } from '@mui/icons-material'
import MyLink from '../components/MyLink'
import StyledButton from '../components/StyledButton'
import { formatCreatedDate } from '../../utils/dates'
import RightAside from '../components/RightAside'

const SingleTag = () => {
    const {name} = useParams()
    const {allPost, setAllPost, fetchPosts} = useFetchPost({tags:name})
    return (
        <section id='single-tag-name' className="single-tag-name max-w-6xl mx-auto px-4 py-10">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="left md:w-2/3 mt-4">
                    {
                    <div className="w-full">
                        <MyInfiniteScroll fetchPosts={fetchPosts} setData={setAllPost} items={allPost} queryKey={['AllHomePost']}>
                        <div className='grid md:grid-cols-2 row-auto gap-4'>
                            {
                                allPost.length > 0 &&
                                allPost.map((item)=> {
                                    return <div key={item._id} className="flex flex-col gap-4 mt-4 shadow-lg pb-2">                                            
                                            <ImageKit path={item.mainImg?.filePath ?? 'default-image.jpg'}  w={750} h={450} />
                                            <div className="flex flex-col gap-2 px-4">
                                                <div className="flex justify-between items-center  mb-4">
                                                <Link to={`/cat/${item.category.slug}`} className='p-2 border-[2px] border-[#ee4266] text-[#ee4266] shadow-md uppercase transition-all font-bold text-[0.8rem] hover:text-white rounded hover:bg-[#ee4266]'>{item.category.name}</Link>
                                                    <div className="flex items-center gap-2 text-gray-400">
                                                        <Link to={`/author/${item.user.username}`} className='flex gap-1 items-center hover:text-[#ee4276]'>
                                                            {<Person/>} {item.user.username}</Link>
                                                    </div>
                                                </div>
                                                <i>{formatCreatedDate(item.createdAt)}</i>
                                                <h3 className='font-bold text-lg'>{item.title}</h3>
                                                <MyLink to={'/blog/'}/>
                                                <p className='font-[Maven Pro]'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur cumque id magnam?</p>
                                                <StyledButton className='!shadow-lg w-2/3'>Read More</StyledButton>
                                            </div>
                                        </div>
                                })
                            }
                        </div>
                    </MyInfiniteScroll>
                    </div>
                    }  
                </div>
                <div className="right md:w-1/3 flex gap-4 flex-col">
                    <RightAside/>
                </div> 
            
            </div>

        </section>   
    )
}

export default SingleTag