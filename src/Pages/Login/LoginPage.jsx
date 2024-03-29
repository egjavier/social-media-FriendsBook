import React, { useState } from 'react'
import RegisterPage from '../Register/RegisterPage'
import LoginLogo from './LoginLogo'
import LoginBg from './LoginBg'
import LoginForm from './LoginForm'

function LoginPage() {

  const [ isRegister, setIsRegister ] = useState(false)

  return (
    <section className='login h-screen md:py-10 bg-white'>
      {
        isRegister === true && <RegisterPage close={() =>  {setIsRegister(false)}}/>
      }
      <LoginLogo />
      <div className='max-w-[1000px] mx-auto h-[500px] relative py-7
                      flex justify-center 
                      md:grid md:grid-cols-5 md:static'>
        <LoginBg />
        <LoginForm isRegister={isRegister} setIsRegister={setIsRegister}/>
      </div>
    </section>
    
  )
}

export default LoginPage