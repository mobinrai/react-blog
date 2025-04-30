import { useInfiniteQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import DisplayMessage from './DisplayMessage'

const MyInfiniteScroll = ({fetchPosts, queryKey, setData, items, children}) => {
    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
      } = useInfiniteQuery({
        queryKey: queryKey,
        queryFn: ({pageParam=1})=>fetchPosts(pageParam),
        initialPageParam:1,
        getNextPageParam: (lastPage, pages) => {
            return lastPage.hasMore ? pages.length + 1 : undefined
        },
    })
    useEffect(()=>{
        if(status==='success'){
            const items = data.pages.flatMap(page=>page.posts)
            setData(items)
        }
    },[status, data])
    
    if(status ==='pending'){
        return <DisplayMessage message='Is Loading...'/>
    }
    if(data?.pages?.[0]?.posts?.length === 0){
        // console.log(data?.pages?.[0]?.posts);
        return (<div className='w-full font-bold'>Posts not available. If you want you can create it.</div>)
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