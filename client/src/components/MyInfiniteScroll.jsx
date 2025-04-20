import { useInfiniteQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import IsLoading from './DisplayMessage'
import DisplayMessage from './DisplayMessage'

const MyInfiniteScroll = ({fetchPosts,queryKey,setData,items, children}) => {
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
            endMessage={<DisplayMessage message={`${items.length>0 ?'All data has been loaded...': 'No post found'}`}/>}
            >
                {children}
        </InfiniteScroll>
    )
}

export default MyInfiniteScroll