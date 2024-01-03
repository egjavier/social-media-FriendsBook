import React from 'react'

function LoginBtn() {


  const handleSignin = () => {
    alert('signin!')
  }

  return (
    <button className='bg-[#2351A7] py-1 rounded-md text-sm hover:shadow-md
                        hover:translate-y-0.5 duration-200
                        md:text-md text-white font-bold tracking-widest'
            onClick={handleSignin}>
      Sign In
    </button>  
  )
}

export default LoginBtn