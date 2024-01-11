import React, { useContext } from 'react'
import Context from '../../Context/Context'
import { useNavigate } from 'react-router-dom'
import { signOut } from "firebase/auth"
import { auth } from '../../Config/FirebaseConfig'


function NavbarProfile() {

  // CONTEXT
    const { userInfo } = useContext(Context)

  const navigate = useNavigate()

  const handleLogout =() => {
    signOut(auth)
    location.reload()
    localStorage.clear()
    navigate('/home', { replace: true })
  }

  return (
    <div className='p-1 ps-3 cursor-pointer
                    flex justify-between items-center'>
      <div className='px-2 border-e-2'>
        <img  src={userInfo.profilePhoto} 
              alt={userInfo.firstname}
              title={userInfo.displayName}
              className='w-10 h-10 object-cover rounded-full cursor-pinter
                        hover:scale-105 hover:shadow-md duration-300'
              onClick={() => {navigate(`/${userInfo.userId}`)}}
        />
      </div>
      <div className='mx-2 rounded-full p-1 text-gray-500 cursor-pointer
                      hover:scale-105 hover:shadow-md duration-300'
            onClick={handleLogout}
            title='Sign out'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
        </svg>
      </div>
    </div>
  )
}

export default NavbarProfile