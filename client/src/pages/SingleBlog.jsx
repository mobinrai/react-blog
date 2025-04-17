import React from 'react'
import ImageKit from '../components/ImageKit'
import { Link } from 'react-router-dom'
import SectionTitleWithLine from '../components/SectionTitleWithLine'
import PostImage from '../components/PostImage'
import MyLink from '../components/MyLink'
import PostMetaData from '../components/PostMetaData'
import { Comment, InsertComment } from '@mui/icons-material'
import { TextField } from '@mui/material'
import StyledButton from '../components/StyledButton'
import FollowUs from '../components/FollowUs'
import NewsLetterForm from '../components/NewsLetterForm'

const SingleBlog = () => {
  return (
    <section id="single-blog-page" className="single-blog-page mt-4">
        <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col md:gap-4">
                <div className="flex flex-col-reverse md:flex-row items-end">
                    <div className="flex flex-col w-full gap-4">
                        <h3 className='font-bold text-2xl'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos minus sint quibusdam.</h3>
                        <PostMetaData>
                            <li><a href='#comments' className='flex gap-1 items-center hover:text-[#ee4276]'><Comment/>231 comments</a></li>
                        </PostMetaData>
                    </div>                    
                    <ImageKit path={'default-image.jpg'} className={'w-full md:w-[400px]'}/>
                </div>
                <div className="flex flex-col md:flex-row  mt-4 gap-8">
                    <div className="md:w-[70%]">
                        <ul className="flex gap-4 share-link mb-4">
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
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis iste consequatur omnis amet quo. Saepe consequatur, nostrum nobis nihil illo vero, aliquid hic provident dolorum amet fugit repellendus rem? Nisi, ullam in autem corrupti nulla ea fugiat soluta veritatis eius libero aut, voluptates officiis voluptatum minus natus. Nesciunt, necessitatibus vitae.</p>
                        <p className='mt-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis iste consequatur omnis amet quo. Saepe consequatur, nostrum nobis nihil illo vero, aliquid hic provident dolorum amet fugit repellendus rem? Nisi, ullam in autem corrupti nulla ea fugiat soluta veritatis eius libero aut, voluptates officiis voluptatum minus natus. Nesciunt, necessitatibus vitae.</p>
                        <p className='mt-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis iste consequatur omnis amet quo. Saepe consequatur, nostrum nobis nihil illo vero, aliquid hic provident dolorum amet fugit repellendus rem? Nisi, ullam in autem corrupti nulla ea fugiat soluta veritatis eius libero aut, voluptates officiis voluptatum minus natus. Nesciunt, necessitatibus vitae.</p>
                        <p className='mt-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis iste consequatur omnis amet quo. Saepe consequatur, nostrum nobis nihil illo vero, aliquid hic provident dolorum amet fugit repellendus rem? Nisi, ullam in autem corrupti nulla ea fugiat soluta veritatis eius libero aut, voluptates officiis voluptatum minus natus. Nesciunt, necessitatibus vitae.</p>
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
                                <Link to="/author/authorname">
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
                            <SectionTitleWithLine title={'Comments (4)'}/>
                            <ul className="mt-4 flex flex-col gap-4">
                                <li className='flex gap-4'>
                                    <div>
                                    <img src="../images/users/avatar-1.jpg.webp" className='rounded-[50%]' alt="" srcset=""/>
                                    </div>
                                    <div className="meta-data">
                                        <p className='text-black font-bold'>Author Name <span className='text-gray-500 font-light pl-3'>2 days ago</span></p>
                                        <p className="comments  mt-4">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias tempora tenetur voluptate?
                                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias tempora tenetur voluptate?
                                        </p>
                                        <button className='bg-[#323335] text-white py-1.5 px-3 mt-4'>Reply</button>
                                        <ul className="comments-reply mt-4">
                                            <li className='flex gap-4 mb-4'>
                                                <div>
                                                    <img src="../images/users/avatar-1.jpg.webp" alt="" className='rounded-[50%]' srcset=""/>
                                                </div>
                                                <div className="meta-data">
                                                    <p className='text-black font-bold'>Author Name <span className='text-gray-500 font-light pl-3'>2 days ago</span></p>
                                                    <p className="comments  mt-4">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias tempora tenetur voluptate?
                                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias tempora tenetur voluptate?
                                                    </p>
                                                    <button className='bg-[#323335] text-white py-1.5 px-3 mt-4'>Reply</button>
                                                </div>
                                            </li>
                                            <li className='flex gap-4 mb-4'>
                                                <div>
                                                    <img src="../images/users/avatar-1.jpg.webp" className='rounded-[50%]' alt="" srcset=""/>
                                                </div>
                                                <div className="meta-data">
                                                    <p className='text-black font-bold'>Author Name <span className='text-gray-500 font-light pl-3'>2 days ago</span></p>
                                                    <p className="comments  mt-4">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias tempora tenetur voluptate?
                                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias tempora tenetur voluptate?
                                                    </p>
                                                    <button className='bg-[#323335] text-white py-1.5 px-3 mt-4'>Reply</button>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>                                    
                                </li>
                                <li className='flex gap-4'>
                                    <div>
                                        <img src="../images/users/avatar-1.jpg.webp" alt="" srcset="" className='rounded-[50%]'/>
                                    </div>
                                    <div className="meta-data">
                                        <p className='text-black font-bold'>Author Name <span className='text-gray-500 font-light pl-3'>2 days ago</span></p>
                                        <p className="comments  mt-4">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias tempora tenetur voluptate?
                                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias tempora tenetur voluptate?
                                        </p>
                                        <button className='bg-[#323335] text-white py-1.5 px-3 mt-4'>Reply</button>
                                    </div>
                                </li>
                            </ul>
                            <div className='my-6'>
                                <SectionTitleWithLine title={'Leave a Reply'}/>
                                <p className='text-gray-400'>Your email will not be published</p>
                                <form action="" className='flex flex-col gap-4 mt-6'>
                                    <div className="flex gap-4">
                                    <TextField required id="email" label="Required" defaultValue="Email" fullWidth/>
                                    <TextField required id="fullName" label="Required" defaultValue="Full Name" fullWidth/>
                                    </div>
                                    <TextField required id="website" label="Website" defaultValue="" aria-label='website' fullWidth/>
                                    <TextField multiline minRows={5} label="Required *"/>
                                    <StyledButton width="30%" icon={<InsertComment/>}>Post comment</StyledButton>
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