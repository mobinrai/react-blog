import axios from 'axios'
import React, { useState } from 'react'

const useFetchPost = () => {
    const [allPost, setAllPost] = useState([])
    
    const fetchPosts = async (params) => {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`,{
            params: params
        })
        return res.data
    }
    return {
        allPost, setAllPost, fetchPosts
    }
}

export default useFetchPost