import React, { useState } from 'react'
import Context from './Context'

function ContextProvider({children}) {

  const storedUserInfo = () => {
    const user = localStorage.getItem("user") 
    return user ? JSON.parse(user) : []
  }

  const storedPostsArray = () => {
    const d = localStorage.getItem("postsArray") 
    return d ? JSON.parse(d) : []
  }

  const storedGalleryArray = () => {
    const d = localStorage.getItem("galleryArray") 
    return d ? JSON.parse(d) : []
  }

  const storedMyPostsArray = () => {
    const d = localStorage.getItem("myPostsArray") 
    return d ? JSON.parse(d) : []
  }

  const storedMyGallery = () => {
    const d = localStorage.getItem("myGallery") 
    return d ? JSON.parse(d) : []
  }

  const storedStoriesArray = () => {
    const d = localStorage.getItem("storiesArray") 
    return d ? JSON.parse(d) : []
  }

  const storedAllUsers = () => {
    const d = localStorage.getItem("allUsers") 
    return d ? JSON.parse(d) : []
  }

  const storedProfilepagePosts = () => {
    const d = localStorage.getItem("profilepagePosts") 
    return d ? JSON.parse(d) : []
  }

  const storedProfileGallery = () => {
    const d = localStorage.getItem("profileGallery") 
    return d ? JSON.parse(d) : []
  }

  const [ userInfo, setUserInfo ] = useState(storedUserInfo)
  // REGISTER
  const [ firstname, setFirstName ] = useState("")
  const [ lastname, setLastname ] = useState("")
  const [ username, setUsername ] = useState("")
  const [ isEmail, setIsEmail ] = useState("")
  const [ dob, setDob ] = useState("")
  const [ isPassword, setIsPassword ] = useState("")
  const [ isConfirmPassword, setIsConfirmPassword ] = useState("")
  const [ thumbnail, setThumbnail ] = useState("")
  // IF USER IS LOGGED IN
  const [ isLoggedIn, setIsLoggedIn ] = useState(false)
  // PROFILE PHOTO
  const [ profilePhoto, setProfilePhoto ] = useState("")
  // ADD POST
  const [ uploadedMedia, setUploadedMedia ] = useState("")
  const [ postText, setPostText ] = useState("")
  const [ postPrivacy, setPostPrivacy ] = useState('Public')
  // POSTS ARRAY
  const [ postsArray, setPostsArray ] = useState(storedPostsArray)
  // GALLERY ARRAY
  const [ galleryArray, setGalleryArray ] = useState(storedGalleryArray)
  // MYPOSTS
  const [ myPostsArray, setMyPostsArray ] = useState(storedMyPostsArray)
  // MY GALLERY
  const [ myGallery, setMyGallery ] = useState(storedMyGallery)
  // THUMBNAIL
  const [ uploadedThumbnail, setUploadedThumbnail ] = useState("")
  // NEW POST
  const [ isNewPost, setIsNewPost ] = useState(false)
  // ADD STORY
  const [ storyUrl, setStoryUrl ] = useState("")
  const [ storyName, setStoryName ] = useState("")
  const [ isNewStory, setIsNewStory ] = useState(false)
  const [ storiesArray, setStoriesArray]  = useState(storedStoriesArray)
  // ALL USERS
  const [ allUsers, setAllUsers ] = useState(storedAllUsers)
  // PROFILE PAGE POSTS AND GALLERY
  const [ profilepagePosts, setProfilepagePosts ] = useState(storedProfilepagePosts)
  const [ profileGallery, setProfileGallery ] = useState(storedProfileGallery)

  return (
    <Context.Provider value={{
                              userInfo, setUserInfo,
                              // Register
                              firstname, setFirstName,
                              lastname, setLastname,
                              username, setUsername,
                              isEmail, setIsEmail,
                              dob, setDob,
                              isPassword, setIsPassword,
                              isConfirmPassword, setIsConfirmPassword,
                              isLoggedIn, setIsLoggedIn,
                              profilePhoto, setProfilePhoto,
                              thumbnail, setThumbnail,
                              // ADD POST
                              uploadedMedia, setUploadedMedia,
                              postText, setPostText,
                              postPrivacy, setPostPrivacy,
                              // POSTS ARRAY
                              postsArray, setPostsArray,
                              // GALLERY ARRAY
                              galleryArray, setGalleryArray,
                              // MYPOSTS
                              myPostsArray, setMyPostsArray,
                              // MYGALLERY
                              myGallery, setMyGallery,
                              // THUMBNAIL
                              uploadedThumbnail, setUploadedThumbnail,
                              // NEW POST
                              isNewPost, setIsNewPost,
                              // ADD STORY
                              storyName, setStoryName,
                              storyUrl, setStoryUrl,
                              storiesArray, setStoriesArray,
                              isNewStory, setIsNewStory,
                              // ALL USERS
                              allUsers, setAllUsers,
                              // PROFILE PAGE POSTS AND GALLERY
                              profilepagePosts, setProfilepagePosts,
                              profileGallery, setProfileGallery
                            }}>
    {children}
  </Context.Provider>
  )
}

export default ContextProvider