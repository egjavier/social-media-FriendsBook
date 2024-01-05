import React, { useState } from 'react'
import LoginTitle from './LoginTitle'
import LoginBtn from './LoginBtn'
import LoginDivider from './LoginDivider'
import LoginGoogle from './LoginGoogle'

function LoginForm({isRegister, setIsRegister}) {

  const [ userEmail, setUserEmail ] = useState("")
  const [ userPassword, setUserPassword ] = useState("")

  return (
    <section className='loginForm absolute inset-y-8 w-[300px]  p-5 
                        backdrop-blur-2xl rounded-xl overflow-hidden mt-12
                        md:my-10 flex flex-col gap-5 justify-center items-center
                        md:col-span-2 md:static md:w-full'>
      <LoginTitle />

      {/* input username & password */}
      <div className='flex flex-col w-full gap-2'>
        <input  type="text"
                name='email'
                placeholder='Email'
                value={userEmail}
                onChange={e => {
                  setUserEmail(e.target.value)
                }}
                className='indent-2 py-1 rounded-md focus:outline-none
                          text-slate-600 text-sm bg-white/60 placeholder:text-slate-600
                          md:text-md md:border md:border-slate-300'
        />
        <input  type="Password"
                name='password'
                placeholder='Password'
                value={userPassword}
                onChange={e => {
                  setUserPassword(e.target.value)
                }}
                className='indent-2 py-1 rounded-md focus:outline-none
                text-slate-600 text-sm bg-white/60 placeholder:text-slate-600
                  md:text-md md:border md:border-slate-300'
        />

        <small className='text-[0.70rem] md:text-xs text-slate-600 leading-4 
                          hover:underline mt-1 md:mt-2 italic text-end cursor-pointer'>
          Having trouble logging in?
        </small>
        <LoginBtn userEmail={userEmail} userPassword={userPassword} />
      </div>

      <LoginDivider />
      <LoginGoogle />

      {/* Register */}
      <div className='flex flex-col justify-end items-end w-full'>
        <p className='text-[0.70rem] md:text-xs text-slate-600 leading-4 
                      md:mt-2 italic'>
          Doesn't have an account yet?
        </p>
        <button className='text-[0.70rem] md:text-xs text-white md:text-[#F76C43] leading-4 
                      hover:underline italic cursor-pointer'
            onClick={() => {
              setIsRegister(!isRegister)
            }}>
          Register here
        </button>
      </div>

    </section>
  )
}

export default LoginForm