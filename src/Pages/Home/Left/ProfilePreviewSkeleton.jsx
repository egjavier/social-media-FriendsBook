import React from 'react'

function ProfilePreviewSkeleton() {
  return (
    <div className='flex flex-col gap-5 bg-white w-full p-5 rounded-md'>
      <div>
        <div className='skeleton rounded-xl'/>
        <div className='skeleton relative h-40 flex justify-center'> 
          <div className='skeleton absolute w-20 h-20 rounded-full  
                          bottom-0 border-4 border-white'/>  
        </div>
      </div>

      <div className='flex flex-col justify-center items-center gap-1 my-3'>
        <p className='skeleton h-3 w-1/2'></p>
        <p className='skeleton h-2 w-1/3'></p>
      </div>

      <div className='flex justify-around items-center gap-5 pb-4 pt-1'>
        <div className='w-full flex flex-col gap-1'>
          <p className='skeleton w-full h-3'></p>
          <p className='skeleton w-full h-1'></p>
        </div>
        <div className='w-full flex flex-col gap-1'>
          <p className='skeleton w-full h-3'></p>
          <p className='skeleton w-full h-1'></p>
        </div>
      </div>

      <div>
        <div className='skeleton py-1 rounded-lg h-8 w-full'></div> 
      </div>

    </div>
  )
}

export default ProfilePreviewSkeleton