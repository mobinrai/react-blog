import React, { useEffect, useState } from 'react'
import RecentBlog from '../components/RecentBlog'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import DisplayMessage from '../components/DisplayMessage'
import useFetchPost from '../hooks/useFetchPost'

const Homepage = () => {
    
    const [allTags, setAllTags] = useState([])    
    const {allPost, setAllPost, fetchPosts} = useFetchPost()

    const {
        isPending, 
        isError,
        isSuccess,
        data:tags, 
        error 
    } = useQuery({
        queryKey:['all-tags'],
        queryFn: async()=>{
            return axios.get(`${import.meta.env.VITE_API_URL}/posts/tags/all`)
        }
    })

    useEffect(()=>{
        
        if(isSuccess){
            setAllTags(tags?.data ?? [])
        }
    }, [tags, isSuccess])

    
    if(isPending){
        return <DisplayMessage message='Loading data.'/>
    }

    if(isError){
        return <DisplayMessage message='Error loading data.'/>
    }
    
    return (
        <>   
            <RecentBlog fetchPosts={fetchPosts} allPost={allPost}  allTags={allTags} setAllPost={setAllPost} setAllTags={setAllTags}/>
        </>
    )
}

export default Homepage