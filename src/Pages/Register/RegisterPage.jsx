import React, { useState } from 'react'
import RegisterCloseBtn from './RegisterCloseBtn'
import RegisterTitle from './RegisterTitle'
import RegisterForm from './RegisterForm'
import RegisterSignup from './RegisterSignup'

function RegisterPage({close}) {

  const [ isOpen, setIsOpen ] = useState(false)

  return (
    <div className= {
                      isOpen ? "hidden"
                              : 'register absolute z-20 inset-0 top-[-28px] md:top-0 bg-slate-500/50 flex justify-center items-center overflow-x-hidden' 
                    }>                    
      {/* Modal */}
      <div className='relative bg-white rounded-md p-5 flex flex-col gap-4 w-11/12 sm:w-fit-content max-w-[500px]'>
        <RegisterCloseBtn setIsOpen={setIsOpen} close={close} />
        <RegisterTitle />
        <RegisterForm />
        <RegisterSignup />
      </div>
    </div>
  )
}

export default RegisterPage