import React, { useContext } from 'react'
import Context from '../../Context/Context'

function RegisterCloseBtn({setIsOpen, close}) {

  // CONTEXT 
  const {
          setFirstName,
          setLastname,
          setUsername,
          setIsEmail,
          setDob,
          setIsPassword,
          setIsConfirmPassword,
          setProfilePhoto
        } = useContext(Context)

  return (
    <button className=' absolute font-black rounded-full border-2 w-8 h-8 bg-white
                      border-[#2351A7] text-[#2351A7] right-[-10px] top-[-10px]
                      flex justify-center items-center hover:scale-110 duration-300'
                      onClick={() => {
                        setIsOpen(true)
                        close()
                        // EMPTY THE FIELDS
                          setFirstName('')
                          setLastname('')
                          setUsername('')
                          setIsEmail('')
                          setDob('')
                          setIsPassword('')
                          setIsConfirmPassword('')
                          setProfilePhoto('')
                      }}>
      X
    </button>
    )
}

export default RegisterCloseBtn