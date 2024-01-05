import React from 'react'
import { signOut } from "firebase/auth"
import { auth } from '../../Config/FirebaseConfig'

function HomePage() {

  const handleLogout =() => {
    signOut(auth)
    location.reload()
  }

  return (
    <>
      <div>HomePage</div>
      <br></br>
      <button onClick={handleLogout}>LOGOUT</button>
    </>
  )
}

export default HomePage