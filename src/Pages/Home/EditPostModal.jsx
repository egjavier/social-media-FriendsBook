import React, { useContext } from 'react'
import { doc, collection, getDocs, query, orderBy, updateDoc, where, deleteDoc } from "firebase/firestore"
import db from '../../Config/FirebaseConfig'
import Context from '../../Context/Context'

function EditPostModal({e}) {

  // CONTEXT
  const {
          setPostsArray,
          userInfo,
          setMyPostsArray,
          setMyGallery,
          postTextEdit, setPostTextEdit,
          isUpdated, setIsUpdated 
        } = useContext(Context)
    
  // UPDATE POST BUTTON
  const handleUpdatePost = async() => {
    try{
      // UPDATE POST ON FIREBASE
        const postRef = doc(db, "posts", e.id)
        await updateDoc(postRef, {
          postText: postTextEdit
        })

      // FETCH POSTS FROM FIREBASE
        const q = query(collection(db, "posts"), orderBy("timestamp", "desc"))
        const querySnapshot = await getDocs(q);
        const d = querySnapshot.docs.map( e => ({...e.data(), id: e.id}))
        localStorage.setItem("postsArray", JSON.stringify(d))
        setPostsArray(d)

      // MY POSTS
        const array = []
        d.forEach(post => {
          post.email === userInfo.email && array.push(post)
          localStorage.setItem("myPostsArray", JSON.stringify(array))
          setMyPostsArray(array)
        })

      // UPDATE GALLERY
        deleteDoc(doc(db, "gallery", e.id))

        // ALERT
      alert('Post Updated')
      if(isUpdated === true) {
        location.reload()
        setIsUpdated(false)
      }

      // CLOSE MODAL
        document.getElementById('editPost').close()

    }catch(e){
      console.error(e)
    }

  }

  // PostTextEdit STATE AFTER CLOSING THE MODAL
  const emptyFields = () => {
    setPostTextEdit(e.postText)
  }

  return (
    <dialog id="editPost" className="modal">
      <div className="modal-box">

        {/* TITLE */}
        <div className='flex justify-between mb-3'>
            <p className='font-semibold'>
              Create Post
            </p>
            <div className='modal-action mt-0'>
              <form method='dialog'>
                <button className=' font-black cursor-pointer hover:scale-110 duration-300
                                  w-8 h-8 rounded-full hover:shadow-lg'
                        onClick={emptyFields}>
                    X
                </button>
              </form>
            </div>
          </div>

        {/* TEXTAREA */}
        <textarea className='mt-3 p-2 w-full h-48 placeholder:italic
                    focus:outline-none resize-none bg-gray-100 overflow-scroll rounded-lg'
          value={postTextEdit}
          onChange={e => setPostTextEdit(e.target.value)}
        />

        {/* EDIT BUTTON */}
        <button className={
                            postTextEdit !== ""
                            ? 'mt-3 btn btn-block btn-sm bg-[#2351A7]/90 text-white tracking-wider hover:bg-[#2351A7]'
                            : 'mt-3 btn btn-block btn-sm btn-disabled tracking-wider'
                          }
                onClick={handleUpdatePost}>
          Update
        </button>  
      </div>
    </dialog>  
  )
}

export default EditPostModal