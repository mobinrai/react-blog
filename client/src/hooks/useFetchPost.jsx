import axios from 'axios'
import React, { useState } from 'react'

const useFetchPost = (param) => {
    const [allPost, setAllPost] = useState([])
    
    const fetchPosts = async (pageParam) => {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`,{
            params: {page:pageParam, ...param}
        })
        return res.data
    }
  return {
    allPost, setAllPost, fetchPosts
  }
}

export default useFetchPost