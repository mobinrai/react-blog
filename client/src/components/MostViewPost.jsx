import React from 'react'
import ImageKit from './ImageKit'
import { Link } from 'react-router-dom'
import SectionTitleWithLine from './SectionTitleWithLine'
import { useQuery } from '@tanstack/react-query'
import DisplayMessage from './DisplayMessage'
import axios from 'axios'

const MostViewPost = () => {
    const {
        isPending, 
        isError,
        isSuccess,
        data:mostViews, 
        error
    } = useQuery({
        queryKey:['most-read-post'],
        queryFn: async()=>{
            return axios.get(`${import.meta.env.VITE_API_URL}/posts/most/view`)
        }
    })

    if(isPending){
        return <DisplayMessage message='Loading most view data.'/>
    }
    if(isError){
        return <DisplayMessage message='Error loading data.'/>
    }

    return (
        <>
            {
                mostViews?.data.length>0 && (
                    <div className="popular-widget my-7">
                    <SectionTitleWithLine title={'Most Popular'}/>
                    <ul className="flex flex-wrap gap-4 mt-4">
                        {
                            mostViews?.data.map((item)=>{
                                return <li key={item._id} className='flex gap-4 items-center'>
                                    <ImageKit path={item.mainImg?.filePath ?? 'default-image.jpg'}  w={190} h={120} />
                                    <div className="flex flex-col gap-2">
                                    <span className='text-sm'>{item.desc}</span>
                                        <h3 className='font-bold hover:underline'>
                                            <Link to={`/blog/${item.slug}`}>{item.title}</Link>
                                        </h3>
                                    </div>
                                </li>
                            })
                        }
                    </ul>
                </div>
                )
            }
        </>
        
    )
}

export default MostViewPost