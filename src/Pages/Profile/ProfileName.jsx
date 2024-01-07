import React, { useContext } from 'react'
import Context from '../../Context/Context'

function ProfileName() {

  // CONTEXT
  const { userInfo } = useContext(Context)
  console.log(userInfo)

  return (
    <>
      {/* placeholder */}
      <div className='col-span-3'></div>

        <div className='col-span-6 text-center'>
          <p className='font-bold text-3xl tracking-wide'>
            {userInfo.firstname} {userInfo.lastname}
          </p>
          <small className='text-sm text-gray-600 italic'>
            {userInfo.displayName}
          </small>
        </div>

      {/* placeholder */}
      <div className='col-span-2'></div>   
    </>
  )
}

export default ProfileName