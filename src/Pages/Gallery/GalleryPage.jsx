import React, { useContext, useEffect, useState } from 'react'
import Context from '../../Context/Context'
import { useNavigate } from 'react-router-dom'
import OpenImageModal from './OpenImageModal'
import GallerySkeleton from './GallerySkeleton'

function GalleryPage() {

  const navigate = useNavigate()
  const [ image, setImage ] = useState('')
  const [ isLoading, setIsLoading ] = useState(true)

  // CONTEXT
  const { 
          galleryArray,
          myGallery, setMyGallery,
          userInfo 
        } = useContext(Context)

  // FETCH GALLERY
  const fetch = async() => {
      // FILTER MY IMAGES
      const array = []
      galleryArray.forEach(image => {
        image.email === userInfo.email && array.push(image)
        localStorage.setItem("myGallery", JSON.stringify(array))
        setMyGallery(array)
      })
  }

  useEffect(() => {
    // FETCH GALLERY
      fetch()
    
    localStorage.removeItem('profilepagePosts')
    localStorage.removeItem('profileGallery')

    // SKELETON LOADER
      setTimeout(() => {
        setIsLoading(false)
      }, 5000)
  }, [])

return (
  <section className='gallery min-h-screen max-w-[1200px] p-5 mx-auto bg-white overflow-y-scroll
                      flex flex-col gap-5'>
    <div className='bg-gray-200 py-1 rounded-xl'>
      <p className='font-bold text-2xl md:text-3xl text-center tracking-widest'>
        Gallery
      </p>
    </div>
      <div className=' grid grid-cols-12 justify-center gap-2'>
      {
        isLoading
          ? <GallerySkeleton />
          :  
            myGallery.length < 1
              ? <div className='w-full col-span-12 text-center text-sm text-gray-400 italic'>Gallery is empty</div>
              : myGallery.map(e => {
                return(
                      <div className='card col-span-6 sm:col-span-4 md:col-span-3 lg:col-span-2 border rounded-2xl overflow-hidden'
                            key={e.id} >
                        <img  src={e.postImage}
                              alt={e.postText}
                              className='w-full h-52 object-cover cursor-pointer'
                              onClick={() => {
                                document.getElementById('openImage').showModal()
                                setImage(e)
                              }}
                        />
                      <div className='card-body py-1 px-2 flex gap-0'>
                        <p className='text-lg font-semibold text-wrap  text-center
                                      flex justify-center items-center'>
                          {e.postText.slice(0, 30)} 
                        </p>
                        <small  className='text-xs text-gray-500 italic mt-2 hover:underline cursor-pointer'
                                onClick={() => { navigate(`/${userInfo.userId}`) }}>
                            {e.displayName}
                        </small>
                        <small className='text-xs text-gray-500 italic'>
                          {new Date(e.timestamp.seconds * 1000 + e.timestamp.nanoseconds / 1000000).toString().slice(0, 21)}
                        </small>
                      </div>

                      <OpenImageModal image={image} />
                      </div>
                  )
                })
              }
      </div>
    </section>
)
  

}

export default GalleryPage