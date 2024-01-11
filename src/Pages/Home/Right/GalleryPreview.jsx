import React, { useContext, useEffect, useState } from 'react'
import Context from '../../../Context/Context'
import GalleryPreviewSkeleton from './GalleryPreviewSkeleton'
import { useNavigate } from 'react-router-dom'

function GalleryPreview() {

  const navigate = useNavigate()
  const [ isLoading, setIsLoading ] = useState(true)

  // CONTEXT
  const {
          myGallery,
        } = useContext(Context)


  // SKELETON
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }, [])

  return (
    <>
      {
        isLoading  === true
          ? <GalleryPreviewSkeleton />
          :  <div className='bg-white w-full min-h-[85vh] rounded-xl
                            flex flex-col justify-between'>
              <div className='px-3'>
                <p className='font-semibold py-2 text-center text-lg cursor-default'>
                  Gallery
                </p>
                <hr/>
              </div>

              <div className='grid grid-cols-2 grid-rows-3'>
                {
                  myGallery.length < 1
                  ? <div className='col-span-2 italic text-center text-sm text-gray-400 cursor-default'>No Images</div>
                  : myGallery.slice(0, 6).map(e => {
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

              <div className='px-3'>
                <hr />
                <button className='bg-[#2351A7]/90 py-1 rounded-lg text-sm hover:shadow-md
                                    hover:translate-y-0.5 duration-200 w-full my-3
                                    md:text-md text-white font-bold tracking-wide'
                        onClick={() => navigate('/gallery', { replace: true })}>
                  Go to Gallery
                </button>
              </div>
            </div>
      }
    </>
  )
}

export default GalleryPreview