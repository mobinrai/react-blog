import React from 'react'
import PostListItem from './PostListItem';
import SiteSocialWidget from './SiteSocialWidget';
import SectionTitleWithLine from './SectionTitleWithLine';
import PostImage from './PostImage';
import MyLink from './MyLink';
import NewsLetterForm from './NewsLetterForm';

const RecentBlog = () => {
  return (
    <section id='recent-blog' className="recent-blog max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row gap-4">
            <div className="left md:w-2/3">
                <SectionTitleWithLine title={'Popular Post'}/>
                <div className="post-container grid md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-4 mt-4">
                        <PostImage path={'default-image.jpg'} alt={'default image'} width={732} height={420}/>
                        <div className="flex flex-col gap-2 post-body bg-white relative ml-[3%] -mt-12 p-[5%] -mr-0.5 font-bold dark:bg-black dark:text-white">
                            <MyLink to={'/cat/category'} linkName={'Category'} type={'category'} className={'text-sm'}/>
                            <MyLink to={'/title'} linkName={'Lorem ipsum dolor sit amet consectetur adipisicing elit.'} className={'text-sm'}/>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 mt-4">
                        <PostImage path={'default-image.jpg'} alt={'default image'} width={732} height={420}/>
                        <div className="flex flex-col gap-2 post-body bg-white relative ml-[3%] -mt-12 p-[5%] -mr-0.5 font-bold dark:bg-black dark:text-white">
                            <MyLink to={'/cat/category'} linkName={'Category'} type={'category'} className={'text-sm'}/>
                            <MyLink to={'/title'} linkName={'Lorem ipsum dolor sit amet consectetur adipisicing elit.'} className={'text-sm'}/>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 mt-4">
                        <PostImage path={'default-image.jpg'} alt={'default image'} width={732} height={420}/>
                        <div className="flex flex-col gap-2 post-body bg-white relative ml-[3%] -mt-12 p-[5%] -mr-0.5 font-bold dark:bg-black dark:text-white">
                            <MyLink to={'/cat/category'} linkName={'Category'} type={'category'} className={'text-sm'}/>
                            <MyLink to={'/title'} linkName={'Lorem ipsum dolor sit amet consectetur adipisicing elit.'} className={'text-sm'}/>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 mt-4">
                        <PostImage path={'default-image.jpg'} alt={'default image'} width={732} height={420}/>
                        <div className="flex flex-col gap-2 post-body bg-white relative ml-[3%] -mt-12 p-[5%] -mr-0.5 font-bold dark:bg-black dark:text-white">
                            <MyLink to={'/cat/category'} linkName={'Category'} type={'category'} className={'text-sm'}/>
                            <MyLink to={'/title'} linkName={'Lorem ipsum dolor sit amet consectetur adipisicing elit.'} className={'text-sm'}/>
                        </div>
                    </div>
                    {/* <PostListItem path={'default-image.jpg'} className={''} width={732} height={420}/> */}
                </div>
            </div>
            <div className="right md:w-1/3 flex gap-4 flex-col">
                <SectionTitleWithLine title={'Social Media'}/>
                <SiteSocialWidget/>
                {/* <div className="popular-widget my-7">
                    <SectionTitleWithLine title={'Popular Post'}/>
                </div> */}
                <SectionTitleWithLine title={'NewsLetter'}/>
                <NewsLetterForm/>
            </div>
        </div>
    </section>
    
  )
}

export default RecentBlog