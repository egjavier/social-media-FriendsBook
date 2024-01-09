import React, { useContext, useEffect, useState } from 'react'
import { collection, getDocs, query, orderBy } from "firebase/firestore"
import db from '../../Config/FirebaseConfig'
import Context from '../../Context/Context'
import Hearts from './Hearts'
import FeedSkeleton from '../../Components/FeedSkeleton'

function Feed() {

  const [ isLoading, setIsLoading ] = useState(true)

  // CONTEXT
  const { 
          userInfo,
          postsArray, setPostsArray,
          myPostsArray, setMyPostsArray
        } = useContext(Context)

  // FETCH DATA
    const getPosts = async () => {
      try {
        const q = query(collection(db, "posts"), orderBy("timestamp", "desc"))
        const querySnapshot = await getDocs(q);
        const d = querySnapshot.docs.map( e => ({...e.data(), id: e.id}))
        localStorage.setItem("postsArray", JSON.stringify(d))
        setPostsArray(d)

        // MY POSTS
        const array = []
        postsArray.forEach(post => {
          post.email === userInfo.email && array.push(post)
          localStorage.setItem("myPostsArray", JSON.stringify(array))
          setMyPostsArray(array)
        })

      }catch(e) {
        console.error(e)
      }
    }

    useEffect(() => {
      getPosts()
      console.log(postsArray)
      console.log(myPostsArray)

      // SKELETON LOADER
      setTimeout(() => {
        setIsLoading(false)
      }, 5000)

    }, [])

  return (
    <section>
      {
        isLoading
          ? <FeedSkeleton />
          :  postsArray.map(e => {
              return (
                <div className='border bg-white flex flex-col gap-4 my-5 rounded-xl p-3'
                      key={e.id}>
                  {/* TITLE */}
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
                      <Hearts />
                      <button className='btn btn-ghost btn-sm w-1/2 rounded-none'>
                        Comments
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                        </svg>
                      </button>
                    </div>

                    {/*  */}
                    <div>
                      Comment Placeholder
                    </div>

                </div>
              )
              })
      }
    </section>
  )
}

export default Feed