import React, { useContext, useEffect, useState } from 'react'
import Context from '../../Context/Context'
import { useParams } from 'react-router-dom'


function ProfileImage() {

  const [ isLoading, setIsLoading ] = useState(true)
  const [ user, setUser ] = useState("")
  const { id } = useParams()

  // CONTEXT
  const { 
          allUsers, 
        } = useContext(Context)

  // GET USER
  const getUser = () => {
    allUsers.map(u => {
      if(u.userId === id) {
        setUser(u)
      }
    })
  }

  useEffect(() => {
    getUser()
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }, [])

  return (
    <>
    {
      isLoading
        ? <div className='skeleton w-48 h-48 rounded-full border-4 border-white'></div>
        :  <img src={user.profilePhoto}
                alt={user.username} 
                className='w-48 h-48 rounded-full object-cover border-4 border-white'
          />
    }          
    </>
  )
}

export default ProfileImage