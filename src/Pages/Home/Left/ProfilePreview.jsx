import React, { useContext } from 'react'
import Context from '../../../Context/Context'
import thumbnailPlaceholder from '../../../Images/profileThumbnail.jpg'
import { useNavigate } from 'react-router-dom'

function ProfilePreview() {

  const navigate = useNavigate()

  // CONTEXT
  const { userInfo } = useContext(Context)

  console.log(userInfo)
  const goToProfile = () => {
    navigate(`/${userInfo.userId}`)
  }

  return (
    <div className='bg-white w-full p-5 rounded-md'>
      <div>
        <img src={thumbnailPlaceholder}
              alt='Thumbnail'
              title='Photo by Matthew Henry on Unsplash'
              className='cursor-pointer rounded-xl'
        />
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
          <p className='font-bold text-slate-800'>300</p>
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
  )
}

export default ProfilePreview