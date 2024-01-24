import React, { useContext, useEffect, useState } from 'react'
import Context from '../../Context/Context'
import { getDocs, Timestamp, collection, addDoc, query, orderBy } from "firebase/firestore"
import db from '../../Config/FirebaseConfig'

function CommentModal({e}) {
  
  const [ comment, setComment ] = useState("")
  const [ newComment, setNewComment ] = useState(false)

  // CONTEXT
  const {
          userInfo,
          setAllComments,
          myComs
        } = useContext(Context)

  const emptyFields = () => {
    setComment("")
  }

  // ADD COMMENT TO COLLECTION
  const handlePostCommentBtn = async () => {
    try{
      // add to collection
      await addDoc(collection(db, "comments"), {
        firstname: userInfo.firstname,
        lastname: userInfo.lastname,
        displayName: userInfo.displayName,
        email: userInfo.email,
        postId: e.id,
        userId: userInfo.userId,
        profilePhoto: userInfo.profilePhoto,
        comment: comment,
        timestamp: Timestamp.fromDate(new Date()),
      })

      setNewComment(true)

      // EMPTY TEXT AREA
      setComment("")

      // ALERT
      alert("Your comment has been posted.")

      // CLOSE MODAL
      document.getElementById('commentSection').close()

    } catch(e) {
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
    fetchComments()
    setNewComment(false)
  }, [ newComment === true ])



  return (
    <dialog id="commentSection" className="modal">
      <div className="modal-box">
        {/* TITLE */}
        <div className='flex justify-between mb-3'>
            <p className='font-semibold'>
              Comments
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

          <hr />

        <div className='overflow-y-scroll'>
          {/* BODY */}
          <div className='my-3 w-full flex justify-start items-start'>
            {/* USER IMAGE */}
              <img src={userInfo.profilePhoto}
                    alt={userInfo.displayName + '\'s Profile Picture'}
                    className='mt-3 w-12 h-12 rounded-full object-cover'/>
              <div className='relative px-2 w-full'>
                {/* TEXTAREA */}
                  <textarea className='mt-3 p-2 w-full h-32 placeholder:italic
                                      focus:outline-none resize-none bg-gray-100 overflow-scroll rounded-lg'
                            placeholder='Type here...'
                            id={e.id}
                            value={comment}
                            onChange={e => setComment(e.target.value)}/>

                  <button className={
                                      comment === ""
                                        ? "hidden"
                                        : 'absolute bottom-1 right-1 m-2 rounded-full bg-white shadow-xl p-2 hover:scale-110 duration-200'
                                    }
                          onClick={handlePostCommentBtn}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                    </svg>
                  </button>

              </div>
          </div>

          {/* COMMENTS */}
          <div className='grid grid-cols-8 gap-3 '>
              {
                myComs.map(comment => {
                  return (
                    <>
                      {/* image */}
                      <img  src={comment.profilePhoto}
                            alt={comment.displayName} 
                            className='col-span-1 w-12 h-12 rounded-full object-cover'
                      />

                      {/* NAME DATE AND COMMENT */}
                      <div className='col-span-7 border px-2 rounded-xl'>

                        {/* NAME AND DATE */}
                        <div className='flex flex-col text-gray-500'>
                          {/* name */}
                          <p className='text-sm font-semibold italic'>
                            {comment.firstname} {comment.lastname}
                          </p>

                          {/* time */}
                          <small className='italic text-xs'>
                            {new Date(comment.timestamp.seconds * 1000 + comment.timestamp.nanoseconds / 1000000).toString().slice(0, 21)}
                          </small>
                        </div>

                        {/* commnet */}
                        <div className='my-5'>
                          <p className='font-semibold font-mono text-md'>
                            {comment.comment}
                          </p>
                        </div>
                      </div>
                   </>
                    

                  )
                })
              }
          </div>
        </div>

      </div>
    </dialog>
  )
}

export default CommentModal