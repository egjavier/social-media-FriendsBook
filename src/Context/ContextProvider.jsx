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
  const [ myPostsArray, setMyPostsArray ] = useState([])
  // THUMBNAIL
  const [ uploadedThumbnail, setUploadedThumbnail ] = useState("")

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
                              // THUMBNAIL
                              uploadedThumbnail, setUploadedThumbnail
                            }}>
    {children}
  </Context.Provider>
  )
}

export default ContextProvider