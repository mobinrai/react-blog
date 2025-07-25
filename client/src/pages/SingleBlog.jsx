import React, { useEffect, useRef, useState } from 'react'
import ImageKit from '../components/ImageKit'
import { Link, useLocation, useParams } from 'react-router-dom'
import SectionTitleWithLine from '../components/SectionTitleWithLine'
import PostMetaData from '../components/PostMetaData'
import { Comment } from '@mui/icons-material'
import { useFetchPost } from '../../queries/PostQuery'
import Comments from '../components/Comments'
import { formatCreatedDate } from '../../utils/dates'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import DisplayMessage from '../components/DisplayMessage'
import { useAuth, useUser } from '@clerk/clerk-react'
import RightAside from '../components/RightAside'
import MyLink from '../components/MyLink'
import Loading from '../components/Loading'
import { toast } from 'react-toastify'
import CommentForm from '../components/CommentForm'
import AuthorSocialLink from '../components/AuthorSocialLink'

const SingleBlog = () => {
    let {slug} = useParams()
    const inputRef = useRef(null)
    const formRef = useRef(null)
    
    const {getToken} = useAuth()
    const [replayParentId, setReplayParentId] =useState('')
    const queryClient = useQueryClient()
    const queryKey = ['post', slug]
    const { 
        isPending,
        isSuccess, 
        isError, 
        data, 
        error 
    } = useFetchPost({slug:`${slug}`, queryKey:queryKey})
    
    const mutation = useMutation({
        mutationFn: async (newComment) => {
            const token = await getToken()
            return axios.post(`${import.meta.env.VITE_API_URL}/comments`, newComment, {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                })
        },
        onSuccess:()=>{
           queryClient.invalidateQueries(queryKey)
           formRef.current.reset()
           setReplayParentId(null)
           toast.success("Comment added successfully.")
            window.scrollTo({
                top:900,
                behavior:'smooth'
            })
        },
        onError:(err)=>{
            toast.error(err?.response?.data?.message)
        }
    })

    const {pathname} = useLocation()

    useEffect(() => {
        if(replayParentId && inputRef.current){
            inputRef.current.focus();
        }

    }, [replayParentId]);

    useEffect(() => {
        window.addEventListener('load', ()=> window.scrollTo({
            top:0,
            behavior:'smooth'
        }))
    }, []);

    const handleSubmit = (data)=>{
        mutation.mutate(data)
    }
        
    if (isPending){
        return <Loading/>
    }
    if (isError){
        return <DisplayMessage message={`Error: ${error.message}`}/>
    }
    
    if(data.length<1 || !data) {
        return <DisplayMessage message={`Post not found. Please check the name.`}/>
    }
    const post = data[0]

    const url=encodeURIComponent(`https://84ae-2a02-3100-646b-1b00-6101-7b14-3dd1-bdc8.ngrok-free.app/blog/${slug}`)
    const {img, desc} = post
    const encodedImg = encodeURIComponent(import.meta.env.VITE_IK_URL_ENDPOINT+'/'+img)
    const encodedDesc = encodeURIComponent(desc)
    // console.log(url);
    // console.log(`&media=${encodedImg}&description=${encodedDesc}`);
    const width = post.relatedPosts.length ? (100/post.relatedPosts.length):100;
    return (
        <section id="single-blog-page" className="single-blog-page mt-4">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex flex-col md:gap-4">
                    <div className="flex flex-col-reverse md:flex-row items-end">
                        <div className="flex flex-col w-full gap-4">
                            <h3 className='font-bold text-2xl'>{post.title}</h3>
                            <PostMetaData 
                            createdAt={formatCreatedDate(post.createdAt)}
                            authorName={post.user?.username}
                            categoryName={post.category?.name}
                            authorLink={post.user?.username}
                            categoryLink={post.category?.slug}
                            >
                                <li><a href='#comments' className='flex gap-1 items-center hover:text-[#ee4276]'><Comment/>{post.totalComments} comments</a></li>
                            </PostMetaData>
                        </div>
                        <ImageKit path={post.mainImg?.filePath} className={'w-full md:w-[600px]'}/>
                    </div>
                    <div className="flex flex-col md:flex-row  mt-4 gap-8">
                        <div className="md:w-[70%]">
                            <ul className="flex flex-wrap gap-4 share-link mb-4">
                                <Link to={`https://www.facebook.com/sharer/sharer.php?url=${url}`} 
                                    target="_blank"
                                    rel="noopener noreferrer" 
                                    aria-label='Share on Facebook' 
                                    role='button' 
                                    className='bg-[#1877F2] text-white p-2 rounded-md'>
                                    <span className='py-0.5 px-2  text-white font-bold mr-2'>f</span>Facebook
                                </Link>
                                <Link to={`https://twitter.com/intent/tweet?url=${url}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label='Share on Facebook'
                                    role='button' 
                                    className='bg-black text-white p-2 rounded-md'>
                                    <span className='py-0.5 px-2  text-white font-bold mr-2'>X</span>Twitter
                                </Link>
                                <Link to={'#'} 
                                    aria-label='Share on Facebook' 
                                    role='button' 
                                    className='bg-[#be252d] text-white p-2 rounded-md'>
                                    <span className='py-0.5 px-2  text-white font-bold mr-2'>p</span>Pinterest
                                </Link>
                                <Link to={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
                                    target="_blank"
                                    rel="noopener noreferrer" 
                                    aria-label='Share on Facebook'
                                    role='button'
                                    className='bg-[#ee4276] text-white p-2 rounded-md'>
                                    <span className='py-0.5 px-2  text-white font-bold mr-2'>in</span>LinkedIn
                                </Link>
                            </ul>
                            <div className="post-content bg-[#ecf0f1] p-2" dangerouslySetInnerHTML={{ __html: post.content }} />
                            {
                                post.tags && (
                                    <div className="post-tags mt-4">                                        
                                        <ul className="post-tags-list flex items-center gap-2">
                                            <li><Link to="/blogs" className='uppercase'>tags: </Link></li>
                                        {
                                            post.tags.map((tag,index)=>(
                                                <li key={tag+index} className='bg-gray-300 px-2 py-1 text-black'>{tag}</li>
                                            ))   
                                        }
                                        </ul>                                            
                                    </div> 
                                )
                            }                                              
                            <div className="about-author my-6">
                                <SectionTitleWithLine divClassName={'mb-6'} title={'About Author'}/>
                                <div className="author-media-left relative table-cell align-top mt-6 pr-7">
                                    <Link to={`/author/${post?.user?.username}`}>
                                    <img src={`${post?.user?.img ?post?.user?.img: import.meta.env.VITE_IK_DEFAULT_USER_IMAGE }`} alt="" srcSet="" 
                                    className='mb-4 rounded-[50%] w-24'/></Link>
                                </div>
                                <div className="author-media-right table-cell align-top ">
                                    <p>{post?.user?.description}</p>
                                    <ul className="author-social-list flex gap-4 mt-4">
                                        <AuthorSocialLink/>
                                    </ul>                                    
                                </div>
                            </div>
                            {
                                post?.relatedPosts?.length >0 && (
                                    <div className="related-post-section my-8 py-6">
                                    <SectionTitleWithLine title={'Related Post'}/>
                                    <div className="related-post-wrapper flex gap-4 mt-4">
                                        {
                                            
                                            post.relatedPosts.map((post,index)=>(                                                
                                                <div key={post+index} className={`flex flex-col gap-4 w-[${width}]`}>
                                                    <ImageKit path={post.img} className={'transition-transform ease-in duration-700 group-hover:scale-[1.1]'}/>
                                                    <div className="flex flex-col gap-1 justify-end">
                                                        <p className='text-gray-400 text-sm'>{formatCreatedDate(post.createdAt)}</p>
                                                        <MyLink 
                                                            to={`/blog/${post.slug}`} 
                                                            linkName={post.title} 
                                                            className={'text-sm'}
                                                            />
                                                        <p className='text-sm text-gray-400 font-semibold'>{post.desc}</p>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                )
                            }
                            
                            <div id='comments' className="comments-section my-6 scroll-mt-4">
                                <div className="border-b py-4">
                                    <SectionTitleWithLine title={'Comments'} divClassName={'mb-6'}/>
                                    {
                                        post._id &&
                                        <Comments postId={post._id} onClick={setReplayParentId}/>
                                    }
                                </div>                                
                                <div className='my-6 bg-[#ecf0f1] px-6 py-7'>
                                    <SectionTitleWithLine headingClassName='bg-[#ecf0f1]' title='Leave a Reply'/>
                                    <p className='text-gray-700 py-4'>Your email will not be published</p>
                                    <p className='my-2 text-red-600 text-sm'>Note: Field with * is mandatory</p>
                                    <CommentForm postId={post._id} 
                                    formRef={formRef} 
                                    inputRef={inputRef} 
                                    setReplayParentId={setReplayParentId} 
                                    handleSubmit={handleSubmit} 
                                    replayParentId={replayParentId} 
                                    mutation={mutation}/>
                                </div>
                            </div>
                        </div>
                        <aside className="aside md:w-[30%] flex flex-col gap-4">
                            <RightAside/>
                        </aside>
                    </div>
                </div>
            </div>
        </section> 
    )
}

export default SingleBlog