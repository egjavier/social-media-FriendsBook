import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { signOut } from "firebase/auth"
import { auth } from '../../Config/FirebaseConfig'
import Context from '../../Context/Context'

function HomePage() {

  const navigate = useNavigate()

  // CONTEXT
  const { userInfo } =  useContext(Context)

  const handleLogout =() => {
    signOut(auth)
    location.reload()
  }

  const handleProfilePage =() => {
    navigate(`/${userInfo.userId}`)
  }

  return (
    <>
      <div>HomePage</div>
      <br></br>
      <button onClick={handleLogout}>LOGOUT</button><br/>
      <button onClick={handleProfilePage}>Profile</button>
    </>
  )
}

export default HomePage