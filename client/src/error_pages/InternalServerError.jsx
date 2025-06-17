import React from 'react'

const InternalServerError = () => {
  return (
    <section className='server-error flex items-center justify-center h-svh'>
        <div className="flex flex-col w-1/2 shadow border p-5">
            <div className='flex items-end mb-2 gap-2'>
              <h1 className='text-8xl'>500</h1>
              <p className='text-red-600 font-bold mb-3'>Server Error</p>
            </div>
            <p>Something went wrong.</p>
            <p>The server encountered an error and could not complete your request.</p>
        </div>
    </section>
  )
}

export default InternalServerError