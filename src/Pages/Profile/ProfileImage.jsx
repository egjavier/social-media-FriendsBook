import React, { useContext, useEffect, useState } from 'react'
import Context from '../../Context/Context'

function ProfileImage() {

  const [ isLoading, setIsLoading ] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 5000)
  }, [])


  // CONTEXT
  const { userInfo } = useContext(Context)

  return (
    <>
    {
      isLoading
        ? <div className='skeleton w-48 h-48 rounded-full border-4 border-white'></div>
        :  <img src={userInfo.profilePhoto}
                alt={userInfo.username} 
                className='w-48 h-48 rounded-full object-cover border-4 border-white'
          />
    }          
    </>
  )
}

export default ProfileImage