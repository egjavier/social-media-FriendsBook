import React from 'react'
import logo from '../../Images/favicon.svg'
import { useNavigate } from 'react-router-dom'

function Logo() {

  const navigate = useNavigate()

  return (
    <div className='flex'>
      <img  src={logo} 
            alt="FriendsBook Logo" 
            title='FriendsBook'
            className='md:hidden cursor-pointer h-10 w-24 hover:scale-105 duration-150'
            onClick={() => {
              navigate('/')
            }}/>
      <p className='hidden md:block md:ps-10 lg:ps-0 md:text-start max-w-[1000px] mx-auto cursor-pointer
                    md:text-[#2351A7]/90 font-sans font-black tracking-widest text-2xl'
                    title='FriendsBook'
                    onClick={() => {
                      navigate('/')
                    }}>
        FriendsBook
      </p>
    </div>
  )
}

export default Logo