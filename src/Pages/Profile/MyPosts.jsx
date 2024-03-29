import React, { useContext, useEffect, useState } from 'react'
import Context from '../../Context/Context'
import FeedSkeleton from '../../Components/FeedSkeleton'
import EditPostModal from '../Home/EditPostModal'
import { doc, deleteDoc, collection, getDocs, query, orderBy } from "firebase/firestore"
import db from '../../Config/FirebaseConfig'
import { useNavigate } from 'react-router-dom'
import CommentModal from '../Home/CommentModal'

function MyPosts() {
  // CONTEXT
  const { 
          setMyPostsArray, 
          profilepagePosts,
          userInfo,
          setPostTextEdit,
          myGallery, setMyGallery,
          setPostsArray,
          setIsUpdated,
          allComments,
          setMyComs
        } = useContext(Context)

  const [ isLoading, setIsLoading ] = useState(true)
  const [ postInfo, setPostInfo ] = useState({})
  const navigate = useNavigate()

  // FETCH POSTS
  const getPosts = async () => {
    try {
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

        // MY GALLERY
        const arr = []
        const r = query(collection(db, "gallery"), orderBy("timestamp", "desc"))
        const qs = await getDocs(r);
        const e = qs.docs.map( f => ({...f.data(), id: f.id}))
        e.forEach(image => {
          image.email === userInfo.email && arr.push(image)
          localStorage.setItem("myGallery", JSON.stringify(arr))
          setMyGallery(array)
        })

    }catch(e) {
      console.error(e)
    }
  }

  // DELETE POST
  const handleDeletePost = async (e) => {
    setIsUpdated(true)
    // CONFIRMATION
    if (confirm("Are you sure you want to delete this post?")) {
      
      // DELETE POST FROM COLLECTION
        await deleteDoc(doc(db, "posts", e.id))

      // DELETE IMAGE FROM COLLECTION
        myGallery.forEach(image => {
          image.postImage === e.postImage && deleteDoc(doc(db, "gallery", image.id))
        })

      // FETCH DATA
        getPosts()
      
      // ALERT AND RELOAD
      alert('Post have been deleted succesfully')
      navigate('/home')


    } else {
      alert('NO changes made.')
    }
  }

  // SKELETON LOADER
    useEffect(() => {
      setIsUpdated(false)
      setTimeout(() => {
        setIsLoading(false)
      }, 3000)
    }, [])

  return (
    <section className='max-h-[90vh]'>
      {
        isLoading
          ? <FeedSkeleton />
          :  profilepagePosts.length < 1
              ? <div className='w-full text-center text-sm text-gray-400 italic mt-5'>No post yet.</div>
              :  profilepagePosts.map(e => {
                  return (
                    <div className='border bg-white flex flex-col gap-4 my-5 rounded-xl p-3'
                          key={e.id}>
                      {/* TITLE */}
                      <div className='flex justify-between gap-5'>
                        <div className='flex gap-5'>
                          <img src={e.profilePhoto} 
                                alt={e.displayName + "Profile Photo"}
                                className='w-16 h-16 rounded-full object-cover col-span-2'
                          />
                          <div className='flex flex-col'>
                            <p className='text-lg font-semibold text-slate-800'>
                              {e.firstname} {e.lastname}
                            </p> 
                            <small>
                              {e.privacy}
                            </small>
                            <small className='text-slate-800'>
                              {new Date(e.timestamp.seconds * 1000 + e.timestamp.nanoseconds / 1000000).toString().slice(0, 21)}
                            </small>
                          </div>
                        </div>

                        <div className= {
                                          e.email === userInfo.email 
                                            ? 'block'
                                            : "hidden"
                                        }>
                          <details className="dropdown dropdown-bottom dropdown-end">
                            <summary className="text-2xl cursor-pointer w-8 h-8 flex justify-center items-center 
                                                rounded-full pt-0 hover:shadow-xl hover:scale-110 duration-150">
                              :
                            </summary>
                            <ul className="shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-fit text-xs">
                              <li onClick={() =>  {
                                                    setPostTextEdit(e.postText)
                                                    setPostInfo(e)
                                                    setIsUpdated(true)
                                                    document.getElementById('editPost').showModal()
                                                  }}>
                                <a>Edit</a>
                              </li>
                              <li onClick={() => {
                                            setIsUpdated(true)
                                            handleDeletePost(e)
                                          }}>
                                <a>Delete</a>
                              </li>
                            </ul>
                          </details>
                        </div>
                      </div>

                        {/* POST */}
                        <div className='text-xl font-medium'>
                          {e.postText}
                        </div>

                        {/* MEDIA */}
                        <div>
                          <img  src={e.postImage} 
                                alt="Uploaded Media" 
                                className={
                                  e.postImage === ""
                                    ? 'hidden'
                                    : 'w-full h-96 object-cover'
                                }
                          />
                        </div>

                        {/* COMMENT */}
                        <div className='flex border-y'>
                          <button onClick={() => {
                                        //get post info
                                        setPostInfo(e)

                                        // fetch post comments
                                        const array = []
                                        allComments.map(com => {
                                          com.postId === e.id && array.push(com)
                                          localStorage.setItem("myComs", JSON.stringify(array))
                                          setMyComs(array)
                                        })

                                        // open modal
                                        document.getElementById('commentSection').showModal()
                                      }}className='btn btn-ghost btn-sm w-full rounded-none'>
                            Comments
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                            </svg>
                          </button>
                        </div>

                        <EditPostModal e={postInfo} />
                        <CommentModal e={postInfo} />
                    </div>
                  )
                })
      }

    </section>
  )

}

export default MyPosts