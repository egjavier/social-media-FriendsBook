import React from 'react'
import { useNavigate } from 'react-router-dom'

function NavbarMenu() {

  const navigate = useNavigate()

  return (
    <div className='flex sm:gap-10'>
      <div className='rounded-full p-1 text-gray-500 cursor-pointer
                      hover:scale-105 hover:shadow-md duration-300'
                      title='Home'
            onClick={() => {navigate('/')}}>
        {/* Home ICON */}
        <div className='flex gap-2 px-2'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
          <p className='hidden lg:block'>
            Home
          </p>
        </div>
      </div>

      <div className='rounded-full p-1 text-gray-500 cursor-pointer
                      hover:scale-105 hover:shadow-md duration-300'
                      title='Gallery'
                      onClick={() => {navigate('/gallery')}}>
        {/* GALLERY ICON */}
        <div className='flex gap-2 px-2'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
          <p className='hidden lg:block'>
            Gallery
          </p>
        </div>
      </div>

      <div className='rounded-full p-1 text-gray-500 cursor-pointer
                      hover:scale-105 hover:shadow-md duration-300'
                      title='Edit Profile'
                      onClick={() => {navigate('/editProfile')}}>
        {/* EDIT PROFILE ICON */}
        <div className='flex gap-2 px-2'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
          </svg>
          <p className='hidden lg:block'>
            Edit Profile
          </p>
        </div>
      </div>

    </div>  
  )
}

export default NavbarMenu