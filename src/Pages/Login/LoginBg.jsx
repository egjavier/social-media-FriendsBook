import React from 'react'
import Bg from "../../Images/BG.jpg"

function LoginBg() {
  return (
    <div className='h-full md:col-span-3'>
      <img  src={Bg} 
            alt="Background Image"
            title='Photo from "https://www.vecteezy.com/"'
            className='h-[600px] md:h-[500px] object-cover mx-auto'
      />
    </div>
  )
}

export default LoginBg