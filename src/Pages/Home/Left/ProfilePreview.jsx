import React, { useContext, useEffect, useState } from 'react'
import Context from '../../../Context/Context'
import { useNavigate } from 'react-router-dom'
import ProfilePreviewSkeleton from './ProfilePreviewSkeleton'

function ProfilePreview() {

  const navigate = useNavigate()
  const [ isLoading, setIsLoading ] = useState(true)

  // CONTEXT
  const { userInfo, myPostsArray } = useContext(Context)

  const goToProfile = () => {
    navigate(`/${userInfo.userId}`)
  }

  // SKELETON
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }, [])


  return (
    <>
        {
          isLoading 
            ? <ProfilePreviewSkeleton />
            :  <div className='bg-white w-full min-h-96 p-5 rounded-xl'>
                <div>
                  <div className='cursor-pointer rounded-xl w-full h-40 bg-gray-300 flex justify-center items-center overflow-hidden'>
                  {
                    userInfo.thumbnail !== ""
                    ? <img  src={userInfo.thumbnail} 
                            alt="Thumbnail" 
                            className='w-full h-full object-cover'/>
                    :  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-20 h-20 text-gray-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                      </svg>
                  }
                  </div>
                  <div className='relative h-10 flex justify-center'> 
                    <img src={userInfo.profilePhoto} 
                          alt="Profile Picture" 
                          className=' absolute w-20 h-20 rounded-full object-cover 
                                    bottom-0 border-4 border-white cursor-pointer'
                    />  
                  </div>
                </div>
    
                <div className='flex flex-col justify-center items-center text-slate-800 mb-3 cursor-default'>
                  <p className='text-md font-bold'>
                    {userInfo.firstname} {userInfo.lastname}
                  </p>
                  <p className='text-xs italic'>
                    {userInfo.displayName}
                  </p>
                </div>
    
                <div className='flex justify-around items-center pb-4 pt-1'>
                  <div className='text-center'>
                    <p className='font-bold text-slate-800'>
                      {myPostsArray.length}
                    </p>
                    <p className='font-bold text-xs text-slate-500'>Post</p>
                  </div>
                  <div className='text-center'>
                    <p className='font-bold text-slate-800'>2500</p>
                    <p className='font-bold text-xs text-slate-500'>Followers</p>
                  </div>
                  <div className='text-center'>
                    <p className='font-bold text-slate-800'>278</p>
                    <p className='font-bold text-xs text-slate-500'>Following</p>
                  </div>
                </div>
    
                <div>
                  <button className='bg-[#2351A7]/90 py-1 rounded-lg text-sm hover:shadow-md
                                    hover:translate-y-0.5 duration-200 w-full
                                    md:text-md text-white font-bold tracking-wide'
                          onClick={goToProfile}>
                    My Profile
                  </button> 
                </div>
    
              </div>
        }
    </>
  )
}

export default ProfilePreview