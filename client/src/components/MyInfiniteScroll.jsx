import { useInfiniteQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import DisplayMessage from './DisplayMessage'
import Loading from './Loading'
import axios from 'axios'

const MyInfiniteScroll = ({fetchFunc, queryKey, setData, items, enabled, children}) => {
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
        queryFn: ({pageParam=1})=>{
            return fetchFunc(pageParam)
        },
        initialPageParam:1,
        enabled:enabled,
        getNextPageParam: (lastPage, pages) => {
            return lastPage?.hasMore ? pages.length + 1 : undefined
        },
        onError:(error)=>{
            console.log(error);
            if(axios.AxiosError){
                console.log(error);
            }
            throw new Error(error)
            
        }
    })
    useEffect(()=>{
        if(status==='success'){
            const items = data.pages?.flatMap(page=> page?.result)
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
    if(data?.pages?.[0]?.result?.length === 0){
        return <DisplayMessage message='Posts not available.' className={'font-bold my-20'}/>
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
            endMessage={<DisplayMessage message={`${items.length>0 ?'All data has been loaded.': 'There is not data available.'}`}/>}
            >
                {children}
        </InfiniteScroll>
    )
}

export default MyInfiniteScroll