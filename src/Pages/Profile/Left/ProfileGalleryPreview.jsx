import React, { useContext, useEffect, useState } from 'react'
import Context from '../../../Context/Context'
import ProfilePreviewSkeleton from '../../Home/Right/GalleryPreviewSkeleton'

function profileGalleryPreview() {

  const [ isLoading, setIsLoading ] = useState(true)

  // CONTEXT
  const {
          profileGallery,
          isUpdated
        } = useContext(Context)


  // SKELETON
  useEffect(() => {
    if(isUpdated === true) {
      location.reload()
    }
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }, [])

  return (
    <div className='hidden md:col-span-4 lg:col-span-3 rounded-md gap-3
                    md:flex md:flex-col md:justify-between md:items-center mt-5'>
      {
        isLoading  === true
        ? <ProfilePreviewSkeleton />
        :  <div className='bg-white w-full rounded-xl
                          flex flex-col justify-between'>
            <div className='px-3 my-3'>
              <p className='font-semibold py-2 text-center text-lg cursor-default'>
                Gallery
              </p>
              <hr/>
            </div>

              <div className='grid grid-cols-2 grid-rows-3'>
                {
                  profileGallery.length < 1
                    ? <div className='col-span-2 italic flex justify-center items-start text-sm text-gray-400 cursor-default'>No Images</div>
                    : profileGallery.slice(0, 6).map(e => {
                      return(
                        <div className=' col-span-1 m-2 gap-2' key={e.id}>
                          <img  src={e.postImage}
                                alt={e.postText} 
                                className='w-full h-36 object-cover rounded-xl cursor-pointer'
                          />
                        </div>
                      )
                  })
                }      
              </div>
           </div>
      } 
    </div>
  )
}

export default profileGalleryPreview