import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PostImage from '../components/PostImage'
import MyLink from '../components/MyLink'
import StyledButton from '../components/StyledButton'
import MyInfiniteScroll from '../components/MyInfiniteScroll'
import PostMetaData from '../components/PostMetaData'
import { formatCreatedDate } from '../../utils/dates'
import { Microsoft, ReadMore, Reorder } from '@mui/icons-material'
import useFetchPost from '../hooks/useFetchPost'
import {  userFetchUserDetails } from '../../queries/userQuery'
import Loading from '../components/Loading'
import DisplayMessage from '../components/DisplayMessage'
import AuthorSocialLink from '../components/AuthorSocialLink'

const defaultClass = {
        parentClass:'grid grid-cols-2',
        childClass:'flex flex-col'
    }

const Author = () => {
    const { username } = useParams()
    const [userId, setUserId] = useState('')
    const [authorAvatar, setAuthorAvatar] = useState('')

    const {allPost, setAllPost, fetchPosts} = useFetchPost()
    const {isPending, isError, isSuccess, data, error}= userFetchUserDetails({username})
    const [displayGrid, setDisplayGrid] = useState(true)
    const [cssStyle, setCssStyle] = useState(defaultClass)
    const fetchAllPost = useCallback((pageParam)=>{
        let params = {page:pageParam, user:userId}
        return fetchPosts(params)
    }, [userId])

    useEffect(()=>{           
        if(isSuccess && data && Object.keys(data).length>0){
            setUserId(data._id)
            setAuthorAvatar(data.img)
        }
        
    },[isSuccess, data])
    
    if(isPending){
        return <Loading/>
    }

    if(isError){
        return <DisplayMessage message={error.stack}/>
    }

    const handleDisplayClick=(name='grid')=>{
        setTimeout(()=>{
            if(name==='list'){
                setCssStyle({
                    parentClass:'flex flex-col',
                    childClass:'flex'
                    })
            }else{
                setCssStyle(defaultClass)
            }
            setDisplayGrid(!displayGrid)
        }, 500)
    }

    return (
        <>
            <div className="w-full bg-[#1b1c1e] dark:bg-white text-white pt-32 pb-20 relative top-0 flex justify-center items-center mt-4">
                <div className="max-w-4xl mx-auto px-2.5 flex flex-col items-center justify-center text-center">
                    {
                        authorAvatar &&
                        <img src={authorAvatar} alt={`${allPost?.[0]?.user?.fullName} profile pic`} srcSet="" className='mb-4 rounded-[50%] w-24'/>
                    }
                    <h1 className='text-3xl my-3'></h1>
                    <div className="author-desc">
                        <p className='text-xl'>
                            {data?.description}
                        </p>
                        <ul className="author-social-list flex justify-center gap-4 mt-4">
                            <AuthorSocialLink/>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="max-w-6xl mx-auto my-4 px-4">                
                <MyInfiniteScroll fetchFunc={fetchAllPost} setData={setAllPost} items={allPost} enabled={userId?true:false} queryKey={['AuthorPost', username]}>
                    {
                        allPost.length > 0 &&
                        <>
                            <div className='mb-4 flex items-center'>
                                View as &nbsp; {
                                    displayGrid ?
                                    <p>List <Reorder className='text-[#ee4276] cursor-pointer' onClick={()=>handleDisplayClick('list')}/></p>
                                    :
                                    <p>Grid<Microsoft className='text-[#ee4276] cursor-pointer' onClick={handleDisplayClick}/></p>
                                }    
                            </div>
                            <div className={`${cssStyle?.parentClass} gap-4 w-full`}>
                                { allPost.map((item)=> {
                                    return <div key={item._id} className={`${cssStyle?.childClass} gap-4 w-full`}>
                                            <div>
                                                <PostImage 
                                                to={`/blog/${item.slug}`} 
                                                path={item.mainImg?.filePath} 
                                                alt={item.mainImg?.filePath}
                                                width={550}
                                                />
                                            </div>

                                            <div className="flex flex-col gap-4 w-full">
                                                <MyLink 
                                                to={`/blog/${item.slug}`} 
                                                linkName={item.title}
                                                />

                                                <PostMetaData 
                                                createdAt={formatCreatedDate(item.createdAt)} 
                                                categoryLink={item.category.slug} 
                                                categoryName={item.category.name}
                                                dontShowIcon={true}
                                                />
                                                <p>{item.desc}</p>
                                                <div className="flex gap-4">
                                                    <StyledButton width="40%"><a href={`/blog/${item.slug}`} className='w-full' title='Read more'>Read More <ReadMore/></a></StyledButton>  
                                                </div>
                                            </div>
                                        </div> 
                                })}
                            </div>
                        </>
                    }
                </MyInfiniteScroll>
            </div>
        </>
    )
}

export default Author