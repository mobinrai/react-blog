import React from 'react'

const SelectManager = ({post, categories}) => {
    return (
        <div className="flex flex-col gap-4">
            <label htmlFor="category">Category</label>
            <select name="category" id="" className='border p-3 rounded-md dark:text-black' defaultValue={post?.category} required>
            {
                Array.isArray(categories) &&
                categories.map((item)=>(
                    <option className='p-4' key={item._id} value={item._id}>{item.name}</option>
                ))
            }
            </select>
        </div>
    )
}

export default SelectManager