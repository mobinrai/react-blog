import React, { useEffect } from 'react'
import ImageKit from '../components/ImageKit'
import { Link, useLocation, useParams } from 'react-router-dom'
import SectionTitleWithLine from '../components/SectionTitleWithLine'
import PostImage from '../components/PostImage'
import MyLink from '../components/MyLink'
import PostMetaData from '../components/PostMetaData'
import { Comment, InsertComment } from '@mui/icons-material'
import { TextField } from '@mui/material'
import StyledButton from '../components/StyledButton'
import FollowUs from '../components/FollowUs'
import NewsLetterForm from '../components/NewsLetterForm'
import { useFetchPostBySlug } from '../../queries/PostQuery'
import Comments from '../components/Comments'
import { formatCreatedDate } from '../../utils/dates'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

const SingleBlog = () => {
    const {slug} = useParams()
    const queryKey = ['post', slug]
    const queryClient = useQueryClient()
    const { 
        isPending, 
        isError, 
        data:post, 
        error 
    } = useFetchPostBySlug(slug, queryKey)

    const mutation = useMutation({
        mutationFn: async (newComment) => {
            return axios.post(`${import.meta.env.VITE_API_URL}/comments`, newComment)
        },
        onSuccess:()=>{
           queryClient.invalidateQueries(queryKey) 
        },
        onError:(err)=>{
            console.log(err);
        }
    })

    const {pathname} = useLocation()

    useEffect(() => {
        window.scrollTo({
            top:0,
            behavior:'smooth'
        })
    }, [pathname]);

    useEffect(() => {
        window.addEventListener('load', ()=> window.scrollTo({
            top:0,
            behavior:'smooth'
        }))
    }, []);

    const handleSubmit = (e,postId)=>{
        e.preventDefault();
        const formData = new FormData(e.target)
        const data = {
            fullName:formData.get('fullName'),
            email:formData.get('email'),
            post:postId,
            website:formData.get('website'),
            message:formData.get('message'),
        }
        mutation.mutate(data)
    }

        
    if (isPending) return <p>Loading...</p>;
    if (error) return <p>Error loading post.</p>;   

    return (
        <section id="single-blog-page" className="single-blog-page mt-4">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex flex-col md:gap-4">
                    <div className="flex flex-col-reverse md:flex-row items-end">
                        <div className="flex flex-col w-full gap-4">
                            <h3 className='font-bold text-2xl'>{post?.title}</h3>
                            <PostMetaData 
                            createdAt={formatCreatedDate(post?.createdAt)}
                            authorName={post?.user.username}
                            categoryName={post?.category?.name}
                            authorLink={post?.user.username}
                            categoryLink={post?.category?.slug}
                            >
                                <li><a href='#comments' className='flex gap-1 items-center hover:text-[#ee4276]'><Comment/>231 comments</a></li>
                            </PostMetaData>
                        </div>
                        <ImageKit path={post?.img} className={'w-full md:w-[600px]'}/>
                    </div>
                    <div className="flex flex-col md:flex-row  mt-4 gap-8">
                        <div className="md:w-[70%]">
                            <ul className="flex flex-wrap gap-4 share-link mb-4">
                                <Link to={'#'} aria-label='Share on Facebook' role='button' className='bg-[#1877F2] text-white p-2 rounded-md'>
                                    <span className='py-0.5 px-2  text-white font-bold mr-2'>f</span>Facebook
                                </Link>
                                <Link to={'#'} aria-label='Share on Facebook' role='button' className='bg-black text-white p-2 rounded-md'>
                                    <span className='py-0.5 px-2  text-white font-bold mr-2'>X</span>Twitter
                                </Link>
                                <Link to={'#'} aria-label='Share on Facebook' role='button' className='bg-[#be252d] text-white p-2 rounded-md'>
                                    <span className='py-0.5 px-2  text-white font-bold mr-2'>p</span>Pinterest
                                </Link>
                                <Link to={'#'} aria-label='Share on Facebook' role='button' className='bg-[#ee4276] text-white p-2 rounded-md'>
                                    <span className='py-0.5 px-2  text-white font-bold mr-2'>in</span>LinkedIn
                                </Link>
                            </ul>
                            {post?.content}
                            <div className="post-tags mt-4">
                                <ul className="post-tags-list flex gap-2">
                                    <li><Link to="/blogs" className='uppercase'>tags: </Link></li>
                                    <li><Link to="/blogs" className='bg-gray-400 py-1 px-2 hover:bg-[#ee4266] transition-all duration-1000'>Social</Link></li>
                                    <li><Link to="/blogs" className='bg-gray-400 py-1 px-2 hover:bg-[#ee4266] transition-all duration-1000'>All Post</Link></li>
                                </ul>
                            </div>                        
                            <div className="about-author my-6">
                                <SectionTitleWithLine title={'About Author'}/>
                                <div className="author-media-left relative table-cell align-top pr-7">
                                    <Link to={`/author/${post.user.username}`}>
                                    <img src="../images/users/avatar-1.jpg.webp" alt="" srcset="" className='mb-4 rounded-[50%]' width={700}/></Link>
                                </div>
                                <div className="author-media-right table-cell align-top ">
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam quas provident error rem? Aspernatur minima obcaecati quos. Asperiores, tenetur dignissimos?Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam quas provident error rem? Aspernatur minima obcaecati quos. Asperiores, tenetur dignissimos
                                    </p>
                                    <ul className="author-social-list flex gap-4 mt-4">
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
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="related-post-section my-8 bg-[#f7f7f7] px-3 py-6">
                                <SectionTitleWithLine title={'Related Post'}/>
                                <div className="related-post-wrapper flex gap-4">
                                    <div className="flex flex-col gap-4">
                                        <PostImage path={'default-image.jpg'} className='transition-transform ease-in duration-700 group-hover:scale-[1.1]' width={300}/>
                                        <div className="flex flex-col gap-4 justify-end">
                                            <MyLink linkName='Category' type={'category'}/>
                                            <MyLink linkName={'Lorem ipsum, dolor sit amet consectetur adipisicing elit.'}/>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <PostImage path={'default-image.jpg'} className='transition-transform ease-in duration-700 group-hover:scale-[1.1]' width={300}/> 
                                        <div className="flex flex-col gap-4 justify-end">
                                            <MyLink linkName='Category' type={'category'}/>
                                            <MyLink linkName={'Lorem ipsum, dolor sit amet consectetur adipisicing elit.'}/>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <PostImage path={'default-image.jpg'} className='transition-transform ease-in duration-700 group-hover:scale-[1.1]' width={300}/>  
                                        <div className="flex flex-col gap-4 justify-end">
                                            <MyLink linkName='Category' type={'category'}/>
                                            <MyLink linkName={'Lorem ipsum, dolor sit amet consectetur adipisicing elit.'}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id='comments' className="comments-section my-6 scroll-mt-4">
                                <SectionTitleWithLine title={'Comments'}/>
                                <ul className="mt-4 flex flex-col gap-4">
                                    <Comments postId={post?._id}/>
                                </ul>
                                <div className='my-6'>
                                    <SectionTitleWithLine title={'Leave a Reply'}/>
                                    <p className='text-gray-400 mt-4'>Your email will not be published</p>
                                    <p className='my-2 text-red-600 text-sm'>Note: Field with * is mandatory</p>
                                    <form onSubmit={(event)=>handleSubmit(event, post?._id)} className='flex flex-col gap-4 mt-6'>
                                        <div className="flex gap-4">
                                        <TextField required id="fullName" name='fullName' label="Full Name"  fullWidth/>
                                        <TextField required id="email" name='email' label="Email" fullWidth/>
                                        </div>
                                        <TextField id="website" name='website' label="Website" defaultValue="" aria-label='website' fullWidth/>
                                        <TextField multiline name='message' minRows={5} label="Required *" required/>
                                        <StyledButton width="30%" icon={<InsertComment/>} type="submit">Post comment</StyledButton>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <aside className="aside md:w-[30%] flex flex-col gap-4">
                            <FollowUs/>
                            <SectionTitleWithLine title={'Popular Post'}/>
                            <div className="flex gap-4">
                                <PostImage path={'default-image.jpg'} alt={'default image'} width={400}/>
                                <div className="flex flex-col gap-2">
                                    <MyLink linkName={'Category'} type={'category'} className={'text-sm'}/>
                                    <MyLink linkName={'Lorem ipsum dolor sit amet consectetur adipisicing elit.'} className={'text-sm'}/>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <PostImage path={'default-image.jpg'} alt={'default image'} width={400}/>
                                <div className="flex flex-col gap-2">
                                    <MyLink linkName={'Category'} type={'category'} className={'text-sm'}/>
                                    <MyLink linkName={'Lorem ipsum dolor sit amet consectetur adipisicing elit.'} className={'text-sm'}/>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <PostImage path={'default-image.jpg'} alt={'default image'} width={400}/>
                                <div className="flex flex-col gap-2">
                                    <MyLink linkName={'Category'} type={'category'} className={'text-sm'}/>
                                    <MyLink linkName={'Lorem ipsum dolor sit amet consectetur adipisicing elit.'} className={'text-sm'}/>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <PostImage path={'default-image.jpg'} alt={'default image'} width={400}/>
                                <div className="flex flex-col gap-2">
                                    <MyLink linkName={'Category'} type={'category'} className={'text-sm'}/>
                                    <MyLink linkName={'Lorem ipsum dolor sit amet consectetur adipisicing elit.'} className={'text-sm'}/>
                                </div>
                            </div>
                            <SectionTitleWithLine title={'NewsLetter'}/>
                            <NewsLetterForm/>
                        </aside>
                    </div>
                </div>
            </div>
        </section> 
    )
}

export default SingleBlog