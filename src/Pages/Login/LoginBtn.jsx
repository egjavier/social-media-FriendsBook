import React from 'react'
import { auth } from '../../Config/FirebaseConfig'
import { signInWithEmailAndPassword } from "firebase/auth";

function LoginBtn({userEmail, userPassword}) {

  const email = userEmail
  const password = userPassword

  const handleSignin = () => {
    if (userEmail !== "" && userPassword !== "") {
      try{
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log('user logged in')
            console.log("user: ", user)
          })
          .catch((error) => {
            console.error(error)
            alert('Invalid Credential')
          });
      } catch(error) {
        console.error(error)
      }
    } else {
      alert('Missing fields!')
    }
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