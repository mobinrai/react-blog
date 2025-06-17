import React from 'react'
import RecentBlog from '../components/RecentBlog'
import useFetchPost from '../hooks/useFetchPost'
import useFetchTags from '../hooks/useFetchTags'
import Loading from '../components/Loading'
import DisplayMessage from '../components/DisplayMessage'
import { isAxiosError } from 'axios'

const Homepage = () => {
    const {allTags, isError, isPending, error, isSuccess} = useFetchTags()   
    const {allPost, setAllPost, fetchPosts} = useFetchPost()
    const fetchAllPost = (pageParam)=>{
        return fetchPosts({page:pageParam})
    }
    if (isPending) return <Loading />
    if (isError)
    {
        if(isAxiosError(error))
        {
            throw error
        }
        else{
            return <DisplayMessage message="Error loading tags." />
        }
    }
    
    return (
        <>
        {
            isSuccess &&
            <RecentBlog fetchPosts={fetchAllPost} allPost={allPost}  allTags={allTags} setAllPost={setAllPost}/>
        }</>
    )
}

export default Homepage