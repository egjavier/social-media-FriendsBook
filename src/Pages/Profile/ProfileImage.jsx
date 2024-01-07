import React, { useContext } from 'react'
import Context from '../../Context/Context'

function ProfileImage() {

  // CONTEXT
  const { userInfo } = useContext(Context)

  return (
    <img src={userInfo.profilePhoto}
          alt={userInfo.username} 
          className='w-48 h-48 rounded-full object-cover border-4 border-white'
    />
  )
}

export default ProfileImage