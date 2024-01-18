import React from 'react'

function ProfileGallerySkeleton() {
  return (
    <div className='flex flex-col gap-5 bg-white w-full p-5 rounded-md'>
      <div className='bg-white w-full min-h-[85vh] rounded-xl
                      flex flex-col justify-between'>
        <div className='px-3'>
          <p className='skeleton py-2 w-full h-3 mb-3'></p>
          <hr/>
        </div>

        <div className='grid grid-cols-2 grid-rows-3'>
          <div className=' col-span-1 m-2 gap-2'>
            <div className='skeleton w-full h-36 rounded-xl'/>
          </div>
          <div className=' col-span-1 m-2 gap-2'>
            <div className='skeleton w-full h-36 rounded-xl'/>
          </div>
          <div className=' col-span-1 m-2 gap-2'>
            <div className='skeleton w-full h-36 rounded-xl'/>
          </div>
          <div className=' col-span-1 m-2 gap-2'>
            <div className='skeleton w-full h-36 rounded-xl'/>
          </div>
          <div className=' col-span-1 m-2 gap-2'>
            <div className='skeleton w-full h-36 rounded-xl'/>
          </div>
          <div className=' col-span-1 m-2 gap-2'>
            <div className='skeleton w-full h-36 rounded-xl'/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileGallerySkeleton