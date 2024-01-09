import React from 'react'

function FeedSkeleton() {
  return (
    <>
      <div className='border bg-white flex flex-col gap-4 my-5 rounded-xl p-3'>
        <div className="flex gap-4 items-center">
          <div className="skeleton w-16 h-16 rounded-full shrink-0"></div>
          <div className="flex flex-col gap-2 w-1/4">
            <small className="skeleton h-4 w-full"></small>
            <small className="skeleton h-2 w-1/2"></small>
            <small className="skeleton h-2 w-2/3"></small>
          </div>
        </div>
        <div className='w-full flex flex-col gap-2 px-3'>
          <p className='skeleton h-3'></p>
          <p className='skeleton h-3'></p>
        </div>
        <div className="skeleton w-full h-96"></div>
      </div>

      <div className='border bg-white flex flex-col gap-4 my-5 rounded-xl p-3'>
      <div className="flex gap-4 items-center">
        <div className="skeleton w-16 h-16 rounded-full shrink-0"></div>
        <div className="flex flex-col gap-2 w-1/4">
          <small className="skeleton h-4 w-full"></small>
          <small className="skeleton h-2 w-1/2"></small>
          <small className="skeleton h-2 w-2/3"></small>
        </div>
      </div>
      <div className='w-full flex flex-col gap-2 px-3'>
        <p className='skeleton h-3'></p>
        <p className='skeleton h-3'></p>
      </div>
      <div className="skeleton w-full h-96"></div>
    </div>

    <div className='border bg-white flex flex-col gap-4 my-5 rounded-xl p-3'>
      <div className="flex gap-4 items-center">
        <div className="skeleton w-16 h-16 rounded-full shrink-0"></div>
        <div className="flex flex-col gap-2 w-1/4">
          <small className="skeleton h-4 w-full"></small>
          <small className="skeleton h-2 w-1/2"></small>
          <small className="skeleton h-2 w-2/3"></small>
        </div>
      </div>
      <div className='w-full flex flex-col gap-2 px-3'>
        <p className='skeleton h-3'></p>
        <p className='skeleton h-3'></p>
      </div>
      <div className="skeleton w-full h-96"></div>
    </div>

    <div className='border bg-white flex flex-col gap-4 my-5 rounded-xl p-3'>
      <div className="flex gap-4 items-center">
        <div className="skeleton w-16 h-16 rounded-full shrink-0"></div>
        <div className="flex flex-col gap-2 w-1/4">
          <small className="skeleton h-4 w-full"></small>
          <small className="skeleton h-2 w-1/2"></small>
          <small className="skeleton h-2 w-2/3"></small>
        </div>
      </div>
      <div className='w-full flex flex-col gap-2 px-3'>
        <p className='skeleton h-3'></p>
        <p className='skeleton h-3'></p>
      </div>
      <div className="skeleton w-full h-96"></div>
    </div>
    </>
  )
}

export default FeedSkeleton