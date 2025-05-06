import { useInfiniteQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import DisplayMessage from './DisplayMessage'
import Loading from './Loading'
import axios from 'axios'

const MyInfiniteScroll = ({fetchPosts, queryKey, setData, setAllTags, items, children}) => {
    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isError,
        isFetchingNextPage,
        status,
      } = useInfiniteQuery({
        queryKey: queryKey,
        queryFn: ({pageParam=1})=>fetchPosts(pageParam),
        initialPageParam:1,
        getNextPageParam: (lastPage, pages) => {
            return lastPage.hasMore ? pages.length + 1 : undefined
        },
        onError:(error)=>{
            if(axios.AxiosError){
                console.log(error);
            }
            throw new Error(error)
        }
    })
    useEffect(()=>{
        if(status==='success'){
            const items = data.pages.flatMap(page=>page.posts)
            setData(items)
        }
    },[status, data])
    
    if(status ==='pending'){
        return <Loading/>
    }

    if(isError){
        let message = 'Something went wrong.'
        if(axios.isAxiosError(error)){
            if(!error.response){
                message='Network error: please check your internet connection. Or check your database connection';
            }
        }
        return <DisplayMessage message={message}/>
    }

    if(data?.pages?.[0]?.posts?.length === 0){
        return <DisplayMessage message='Posts not available. If you want you can create it.' className={'font-bold my-20'}/>
    }

    return (
                
        <InfiniteScroll
            dataLength={items.length}
            hasMore={!!hasNextPage}
            next={()=>{
                    if(!isFetchingNextPage){
                        fetchNextPage()
                    }
                }
            }
            loader={<DisplayMessage message='Loading...'/>}
            endMessage={<DisplayMessage message={`${items.length>0 ?'All data has been loaded...': 'Post not found.'}`}/>}
            >
                {children}
        </InfiniteScroll>
    )
}

export default MyInfiniteScroll