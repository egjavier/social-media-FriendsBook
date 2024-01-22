import React, { useContext, useEffect } from 'react'
import Thumbnail from './Thumbnail'
import ProfileImage from './ProfileImage'
import ProfileName from './ProfileName'
import MyPosts from './MyPosts'
import ProfileGalleryPreview from './Left/ProfileGalleryPreview'
import { collection, getDocs, query, orderBy } from "firebase/firestore"
import db from '../../Config/FirebaseConfig'
import Context from '../../Context/Context'
import { useParams } from 'react-router-dom'

function ProfilePage() {

    const { id } = useParams()

    // CONTEXT
    const {
      profilepagePosts, setProfilepagePosts,
      postsArray, setPostsArray,
      galleryArray,
      profileGallery, setProfileGallery
    } =  useContext(Context)

    // FETCH POSTS
    const getPosts = async () => {
      try {
          const q = query(collection(db, "posts"), orderBy("timestamp", "desc"))
          const querySnapshot = await getDocs(q);
          const d = querySnapshot.docs.map( e => ({...e.data(), id: e.id}))
          localStorage.setItem("postsArray", JSON.stringify(d))
          setPostsArray(d)

          const array = []
          postsArray.forEach(post => {
            post.userId === id && array.push(post)
            localStorage.setItem("profilepagePosts", JSON.stringify(array))
            setProfilepagePosts(array)
          })
      }catch(e) {
        console.error(e)
      }
    }

    // FETCH GALLERY
    const fetchGallery = async () => {
      const array = []
      galleryArray.forEach(image => {
        image.userId === id && array.push(image)
        localStorage.setItem("profileGallery", JSON.stringify(array))
        setProfileGallery(array)
      })
    }
    
    useEffect(() => {
      getPosts()
      fetchGallery()
    }, [])

  return (
    <section className='profile max-w-[1200px] mx-auto bg-[#f7f7f7] flex flex-col gap-5 mb-5'>
      <div className='relative'>
        <Thumbnail />
        <div className='absolute w-full px-10 bottom-[-95px] text-center flex
                        justify-center md:justify-between md:items-center'>
          <ProfileImage />
        </div>
      </div>

      <div className='pt-4 md:pt-0 pb-3 shadow-lg'>
        <div className='mt-12 py-3
                        md:text-start md:grid md:grid-cols-11 md:mt-0'>
          <ProfileName />
        </div>
      </div>

      <div className=' md:px-1 md:grid md:grid-cols-12 md:gap-2 h-screen'>
        <div className='hidden md:block col-span-3'>
          <ProfileGalleryPreview />
        </div>
        <div className='md:col-span-6 overflow-y-scroll'>
          <MyPosts />
        </div>
        <div className='hidden md:block bg-pink-300 col-span-3'>chat</div>
      </div>
    </section>
  )
}

export default ProfilePage