import React, { useContext } from 'react'
import Context from '../../Context/Context'
import { useNavigate } from 'react-router-dom'

function NavbarProfile() {

  // CONTEXT
    const { userInfo } = useContext(Context)

  const navigate = useNavigate()

  return (
    <div className='rounded-full p-1 ps-3 text-[#2351A7]/80 cursor-pointer'>
      <img  src={userInfo.profilePhoto} 
            alt={userInfo.firstname}
            title={userInfo.displayName}
            className='w-10 h-10 object-cover rounded-full cursor-pinter
                      hover:scale-105 hover:shadow-md duration-300'
            onClick={() => {navigate(`/${userInfo.userId}`)}}
      />
    </div>
  )
}

export default NavbarProfile