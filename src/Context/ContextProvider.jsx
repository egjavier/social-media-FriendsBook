import React, { useState } from 'react'
import Context from './Context'

function ContextProvider({children}) {

  const storedUserInfo = () => {
    const user = localStorage.getItem("user") 
    return user ? JSON.parse(user) : []
  }

  const [ userInfo, setUserInfo ] = useState(storedUserInfo)
  // REGISTER
  const [ firstname, setFirstName ] = useState("")
  const [ lastname, setLastname ] = useState("")
  const [ username, setUsername ] = useState("")
  const [ isEmail, setIsEmail ] = useState("")
  const [ dob, setDob ] = useState("")
  const [ isPassword, setIsPassword ] = useState("")
  const [ isConfirmPassword, setIsConfirmPassword ] = useState("")
  // IF USER IS LOGGED IN
  const [ isLoggedIn, setIsLoggedIn ] = useState(false)
  // PROFILE PHOTO
  const [ profilePhoto, setProfilePhoto ] = useState("")

  return (
    <Context.Provider value={{
                              userInfo, setUserInfo,
                              // Register
                              firstname, setFirstName,
                              lastname, setLastname,
                              username, setUsername,
                              isEmail, setIsEmail,
                              dob, setDob,
                              isPassword, setIsPassword,
                              isConfirmPassword, setIsConfirmPassword,
                              isLoggedIn, setIsLoggedIn,
                              profilePhoto, setProfilePhoto
                            }}>
    {children}
  </Context.Provider>
  )
}

export default ContextProvider