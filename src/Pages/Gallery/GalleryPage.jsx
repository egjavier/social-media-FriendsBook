import React, { useContext, useEffect, useState } from 'react'
import { collection, getDocs, query, orderBy } from "firebase/firestore"
import db from "../../Config/FirebaseConfig"
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
          galleryArray, setGalleryArray,
          userInfo 
        } = useContext(Context)

  // FETCH GALLERY
  const fetch = async() => {
    try {
      const q = query(collection(db, "gallery"), orderBy("timestamp", "desc"))
      const querySnapshot = await getDocs(q);
      const d = querySnapshot.docs.map( e => ({...e.data(), id: e.id}))
      console.log("d", d)

      // SAVE TO LOCAL STORAGE
      if(userInfo.email === d.email) {
        localStorage.setItem("galleryArray", JSON.stringify(d))
        setGalleryArray(d)
      }

    }catch(e) {
      console.error(e)
    }
  }

  useEffect(() => {
    fetch()
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
      {
        isLoading
          ? <GallerySkeleton />
          :  
            galleryArray.length < 1
              ? <div className='w-full text-center text-sm text-gray-400 italic'>Gallery is empty</div>
              : galleryArray.map(e => {
                return(
                    <div className=' grid grid-cols-12 justify-center gap-2'>
                      <div className='card col-span-6 sm:col-span-4 md:col-span-3 lg:col-span-2 border rounded-2xl overflow-hidden'>
                        <img  src={e.postImage}
                              alt={e.postText}
                              className='w-full h-52 object-cover cursor-pointer'
                              onClick={() => {
                                document.getElementById('openImage').showModal()
                                setImage(e.postImage)
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
                  </div>
                  )
            })
      }
    </section>
)
  

}

export default GalleryPage