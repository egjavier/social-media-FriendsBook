import React, { useContext, useEffect, useState } from 'react'
import Context from '../../Context/Context'
import { useParams } from 'react-router-dom'

function ProfileName() {

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

  useEffect(() =>{
    getUser()
  }, [])

  return (
    <>
      {/* placeholder */}
      <div className='col-span-3'></div>

        <div className='col-span-6 text-center'>
          <p className='font-bold text-3xl tracking-wide'>
            {user.firstname} {user.lastname}
          </p>
          <small className='text-sm text-gray-600 italic'>
            {user.displayName}
          </small>
        </div>

      {/* placeholder */}
      <div className='col-span-2'></div>   
    </>
  )
}

export default ProfileName