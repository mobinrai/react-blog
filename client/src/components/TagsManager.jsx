import React from 'react'
import TagInputField from './TagInputField'
import { Close } from '@mui/icons-material'

const TagsManager = ({tag, tags, errors, setTag, setTags, setErrors}) => {

    const deleteSelectedTag = (name)=>{
        setTags(tags.filter(tag=> tag !==name))
        setTag(name)
    }

  return (
        <div className='flex flex-col gap-4'>
            <label htmlFor="tags">Tags</label>
            {
                tags && (
                    <div className='flex gap-4'>                        
                        {tags.map(tag=>(
                            <p key={tag} className="flex items-center gap-1 bg-gray-200 p-1 cursor-pointer" onClick={() => deleteSelectedTag(tag)}>
                                <span className=''>{tag}</span>
                                <Close className='!text-[18px] text-red-500' onClick={() => deleteSelectedTag(tag)} />
                            </p>
                            ))
                        }
                    </div>
                )
            }
            <TagInputField 
            tag={tag} 
            tags={tags} 
            setTag={setTag} 
            setTags={setTags}
            setErrors={setErrors}/>
            {errors.tags && <p className="text-red-500 text-sm">{errors.tags}</p>}
        </div>
    )
}

export default TagsManager