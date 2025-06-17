import React from 'react'

const DataBaseConnectionError = () => {
    return (
        <section className='database-connection-error mt-[10%] ml-[25%]'>
            <div className="flex flex-col w-1/2 shadow border p-5">
                Couldn't establish connection to database. Please, try again later.                
            </div>
        </section>
    )
}

export default DataBaseConnectionError