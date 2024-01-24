import React, { useContext, useEffect, useState } from 'react'
import AddPost from '../../Components/AddPostFolder/AddPost'
import Feed from './Feed'
import LeftSection from './Left/LeftSection'
import RightSection from './Right/RightSection'
import Context from '../../Context/Context'
import { collection, getDocs, query, orderBy, doc, deleteDoc } from "firebase/firestore"
import db from '../../Config/FirebaseConfig'
import AddStorySmall from './Stories/AddStorySmall'
import SearchSmall from './SearchSmall'
import StoriesSection from './Stories/StoriesSection'
import AddStoryModal from './Stories/AddStoryModal'
import SearchModal from './Left/SearchModal'

function HomePage() {

  const [ isLoading, setIsLoading ] = useState(true)
  const posts = JSON.parse(localStorage.getItem("postsArray"))

  // CONTEXT
  const { 
          userInfo,
          setPostsArray,
          galleryArray, setGalleryArray,
          setMyPostsArray,
          setMyGallery,
          isNewPost, setIsNewPost,
          setStoriesArray,
          isNewStory, setIsNewStory,
          setAllUsers,
          setAllComments
        } = useContext(Context)

    // FETCH POSTS
    const getPosts = async () => {
      try {
          const q = query(collection(db, "posts"), orderBy("timestamp", "desc"))
          const querySnapshot = await getDocs(q);
          const d = querySnapshot.docs.map( e => ({...e.data(), id: e.id}))
          localStorage.setItem("postsArray", JSON.stringify(d))
          setPostsArray(d)

      }catch(e) {
        console.error(e)
      }
    }

    // FETCH GALLERY
    const fetchGallery = async () => {
      try{
        const r = query(collection(db, "gallery"), orderBy("timestamp", "desc"))
        const qs = await getDocs(r);
        const e = qs.docs.map( f => ({...f.data(), id: f.id}))
        setGalleryArray(e)

        const array = []
        galleryArray.forEach(image => {
          image.email === userInfo.email && array.push(image)
          localStorage.setItem("myGallery", JSON.stringify(array))
          setMyGallery(array)
        })

        setIsNewPost(false)
      }catch(error) {
        console.error(error)
      }
    }

    // MY POSTS
    const fetchMyPosts = async () => {
      try{
        if(posts !== null) {
          const array = []
          posts.forEach(post => {
            post.email === userInfo.email && array.push(post)
            localStorage.setItem("myPostsArray", JSON.stringify(array))
            setMyPostsArray(array)
          })
        }
      }catch(error) {
        console.error(error)
      }
    }

    // FETCH STORIES
    const fetchStories = async () => {
      try{
        const q = query(collection(db, "stories"), orderBy("timestamp", "desc"))
        const querySnapshot = await getDocs(q);
        const d = querySnapshot.docs.map( e => ({...e.data(), id: e.id}))    
        
      // <MAX OF 15 STORIES
       const story = d.slice(0, 15)
       localStorage.setItem("storiesArray", JSON.stringify(d))
       setStoriesArray(d)

          
        setIsNewStory(false)
      }catch(e) {
        console.error(e)
      }
    }

    // FETCH ALL USERS
    const fetchAllUsers = async () => {
      try {
          const q = query(collection(db, "users"))
          const querySnapshot = await getDocs(q);
          const d = querySnapshot.docs.map( e => ({...e.data(), id: e.id}))
          localStorage.setItem("allUsers", JSON.stringify(d))
          setAllUsers(d)
      }catch(e) {
        console.error(e)
      }
    }

     // FETCH COMMENTS FROM FIREBASE
    const fetchComments = async () => {
      try{
        const r = query(collection(db, "comments"), orderBy("timestamp", "desc"))
        const qs = await getDocs(r);
        const e = qs.docs.map( f => ({...f.data()}))
        localStorage.setItem('allComments',JSON.stringify(e))
        setAllComments(e)

        }catch(e) {
        console.error(e)
      }
    }

    useEffect(() => {
      fetchGallery()
      fetchMyPosts()
      getPosts()
      fetchStories()
      fetchAllUsers()
      fetchComments()
    }, [posts === null || isNewPost === true || isNewStory === true])

    useEffect(() => {
      getPosts()
      fetchGallery()
      fetchMyPosts()
      fetchStories()
      fetchAllUsers()
      fetchComments()
      localStorage.removeItem('profilepagePosts')
      localStorage.removeItem('profileGallery')
      
    // SKELETON LOADER
      setTimeout(() => {
        setIsLoading(false)
      }, 3000)
    }, [])

 return (
    <section className='relatie profile max-w-[1200px] mx-auto bg-[#f7f7f7] flex flex-col gap-5 my-5'>
      <div className=' md:px-1 md:grid md:grid-cols-12 md:gap-2'>

        <div className='hidden md:block col-span-3'>
          <LeftSection />
        </div>

        <div className='md:relative md:col-span-6 h-screen overflow-scroll'>
          <AddPost />
          <StoriesSection />
          <div className='pt-3'>
            <Feed />
            <AddStorySmall />
            <SearchSmall />
          </div>
        </div>

        <div className='hidden md:block col-span-3'>
          <RightSection />
        </div>

      </div>  

      <AddStoryModal />
      <SearchModal />
    </section>
  )
}

export default HomePage