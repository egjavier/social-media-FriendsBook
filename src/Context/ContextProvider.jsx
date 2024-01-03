import React, { useState } from 'react'
import Context from './Context'

function ContextProvider({children}) {

  const storedUserInfo = () => {
    const user = localStorage.getItem("user") 
    return user ? JSON.parse(user) : []
  }

  const [ userInfo, setUserInfo ] = useState(storedUserInfo)

  return (
    <Context.Provider value={{
                              userInfo, setUserInfo
                            }}>
    {children}
  </Context.Provider>
  )
}

export default ContextProvider