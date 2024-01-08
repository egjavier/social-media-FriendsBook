import React, { useContext, useEffect, useState } from 'react'
import { collection, getDocs, query, orderBy } from "firebase/firestore"
import db from "../../Config/FirebaseConfig"
import Context from '../../Context/Context'
import { useNavigate } from 'react-router-dom'
import OpenImageModal from './OpenImageModal'

function GalleryPage() {

  const navigate = useNavigate()
  const [ image, setImage ] = useState('')
  const [ post, setPost ] = useState('')

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

      // SAVE TO LOCAL STORAGE
      localStorage.setItem("galleryArray", JSON.stringify(d))
      setGalleryArray(d)
      console.log("galleryArray", galleryArray)
    }catch(e) {
      console.error(e)
    }
  }

  useEffect(() => {
    fetch()
  }, [])

  // OPEN IMAGE MODAL ON CLICK
  const handleOpenImage = () => {
    document.getElementById('openImage').showModal()
  }


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
          galleryArray.map(e => {
            return(
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
                                flex justify-center items-center
                                hover:bg-gray-100 cursor-pointer'
                      onClick={() => {
                        document.getElementById('openImage').showModal()
                        setPost(e.postText)
                      }}
                      >
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

                <OpenImageModal image={image} post={post} />
              </div>
                )
              })
            }
      </div>
    </section>
  )
}

export default GalleryPage