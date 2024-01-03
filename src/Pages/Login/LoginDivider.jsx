import React from 'react'

function LoginDivider() {
  return (
    <div className='grid grid-cols-9 items-center w-full font-semibold'>
      <div className='col-span-3'><hr className='font-bold'/></div>
      <div className='col-span-3 text-center text-xs text-white md:text-black'>Or Login with</div>
      <div className='col-span-3'><hr className='font-bold'/></div>
    </div>
  )
}

export default LoginDivider