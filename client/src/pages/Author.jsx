import React from 'react'
import { Link } from 'react-router-dom'
import PostImage from '../components/PostImage'
import MyLink from '../components/MyLink'
import StyledButton from '../components/StyledButton'

const Author = () => {
  return (
    <>
        <div className="w-full bg-[#1b1c1e] dark:bg-white text-white pt-32 pb-20 relative top-0 flex justify-center items-center mt-4">
            <div className="max-w-4xl mx-auto px-2.5 flex flex-col items-center justify-center text-center">
                <img src="../images/users/avatar-1.jpg.webp" alt="" srcset="" className='mb-4 rounded-[50%] w-24'/>
                <h1 className='text-3xl my-3'>Author Name</h1>
                <div className="author-desc">
                    <p className='text-xl'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam quas provident error rem? Aspernatur minima obcaecati quos. Asperiores, tenetur dignissimos?Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam quas provident error rem? Aspernatur minima obcaecati quos. Asperiores, tenetur dignissimos
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
            <div className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row gap-4 w-full">
                    <div className=''>
                        <PostImage path={'default-image.jpg'} alt={'default image'} width={400} imageClass={'max-w-none'}/>
                    </div>
                    <div className="flex flex-col gap-4">
                        <p><MyLink linkName={'Category'} type={'category'}/> <span className='text-gray-500 ml-4'>20 April, 2023</span></p>
                        <MyLink linkName={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum neque commodi ipsum voluptate placeat eos nisi reiciendis velit perferendis veniam!'} />
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, in aspernatur. Fugiat labore distinctio nulla dolorum mollitia voluptates officiis repellat praesentium amet suscipit consectetur, culpa necessitatibus, dolore, modi numquam tempora omnis ut incidunt ipsum id officia. Doloremque tenetur labore, ducimus numquam ut natus...
                        </p>
                        <StyledButton width="40%">Read More...</StyledButton>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4 w-full">
                    <div className=''>
                        <PostImage path={'default-image.jpg'} alt={'default image'} width={400} imageClass={'max-w-none'}/>
                    </div>
                    <div className="flex flex-col gap-4">
                        <p><MyLink linkName={'Category'} type={'category'}/> <span className='text-gray-500 ml-4'>20 April, 2023</span></p>
                        <MyLink linkName={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum neque commodi ipsum voluptate placeat eos nisi reiciendis velit perferendis veniam!'} />
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, in aspernatur. Fugiat labore distinctio nulla dolorum mollitia voluptates officiis repellat praesentium amet suscipit consectetur, culpa necessitatibus, dolore, modi numquam tempora omnis ut incidunt ipsum id officia. Doloremque tenetur labore, ducimus numquam ut natus...
                        </p>
                        <StyledButton width="40%">Read More...</StyledButton>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4 w-full">
                    <div className=''>
                        <PostImage path={'default-image.jpg'} alt={'default image'} width={400} imageClass={'max-w-none'}/>
                    </div>
                    <div className="flex flex-col gap-4">
                        <p><MyLink linkName={'Category'} type={'category'}/> <span className='text-gray-500 ml-4'>20 April, 2023</span></p>
                        <MyLink linkName={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum neque commodi ipsum voluptate placeat eos nisi reiciendis velit perferendis veniam!'} />
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, in aspernatur. Fugiat labore distinctio nulla dolorum mollitia voluptates officiis repellat praesentium amet suscipit consectetur, culpa necessitatibus, dolore, modi numquam tempora omnis ut incidunt ipsum id officia. Doloremque tenetur labore, ducimus numquam ut natus...
                        </p>
                        <StyledButton width="40%">Read More...</StyledButton>
                    </div>
                </div>
                
            </div>
        </div>
    </>
  )
}

export default Author