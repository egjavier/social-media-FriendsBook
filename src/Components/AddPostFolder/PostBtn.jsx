import React, { useContext } from 'react'
import { collection, addDoc, Timestamp, getDocs  } from "firebase/firestore"
import db from '../../Config/FirebaseConfig'
import Context from '../../Context/Context'

function PostBtn() {

  // CONTEXT
  const { 
          userInfo, setPostsArray,
          uploadedMedia, setUploadedMedia,
          postText, setPostText,
          postPrivacy, setPostPrivacy,
          isNewPost, setIsNewPost
        } = useContext(Context)

  const handlePost = async() => {
    try{
      if(postText !== "") {
        addDoc(collection(db, "posts"), {
          firstname: userInfo.firstname,
          lastname: userInfo.lastname,
          displayName: userInfo.displayName,
          email: userInfo.email,
          profilePhoto: userInfo.profilePhoto,
          timestamp: Timestamp.fromDate(new Date()),
          privacy: postPrivacy,
          postText: postText,
          postImage: uploadedMedia,
        })
        
        if(uploadedMedia !== "") {
            addDoc(collection(db, "gallery"), {
              firstname: userInfo.firstname,
              lastname: userInfo.lastname,
              displayName: userInfo.displayName,
              email: userInfo.email,
              profilePhoto: userInfo.profilePhoto,
              timestamp: Timestamp.fromDate(new Date()),
              privacy: postPrivacy,
              postText: postText,
              postImage: uploadedMedia,
            })
          }

        // EMPTY FIELDS
        setPostText("")
        setPostPrivacy('Public')
        setUploadedMedia("")

        // ALERT
        alert('Upload Successsful!')

        // FETCH DATA
        const querySnapshot = await getDocs(collection(db, "posts"));
        const d = querySnapshot.docs.map( e => ({...e.data(), id: e.id}))
        localStorage.setItem("postsArray", JSON.stringify(d))
          setPostsArray(d)

        // CLOSE MODAL
        document.getElementById('addPostModal').close()

        setIsNewPost(true)

      } else {
        alert("Text field should not be empty.")
      }
    }catch(e) {
      console.error(e)
    }
  }

  return (
      <button className={
                          uploadedMedia !== ""
                          ? 'mt-3 btn btn-block btn-sm bg-[#2351A7]/90 text-white tracking-wider hover:bg-[#2351A7]'
                          : 'mt-3 btn btn-block btn-sm btn-disabled tracking-wider'
                        }
      
      
      
      
      
              onClick={handlePost}>
        Post
      </button>  
  )
}

export default PostBtn