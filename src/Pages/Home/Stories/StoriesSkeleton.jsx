import React from 'react'

function StoriesSkeleton() {
  return (
  <>
    <div className='relative rounded-full shadow-xl flex justify-center'>
      <div className='skeleton h-28 w-28 rounded-full object-cover cursor-pointer' />
    </div>
    <div className='relative rounded-full shadow-xl flex justify-center'>
      <div className='skeleton h-28 w-28 rounded-full object-cover cursor-pointer' />
    </div>
    <div className='relative rounded-full shadow-xl flex justify-center'>
      <div className='skeleton h-28 w-28 rounded-full object-cover cursor-pointer' />
    </div>
    <div className='relative rounded-full shadow-xl flex justify-center'>
      <div className='skeleton h-28 w-28 rounded-full object-cover cursor-pointer' />
    </div>
    <div className='relative rounded-full shadow-xl flex justify-center'>
      <div className='skeleton h-28 w-28 rounded-full object-cover cursor-pointer' />
    </div>
  </>
  )
}

export default StoriesSkeleton