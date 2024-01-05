import React from 'react'
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { collection, addDoc} from "firebase/firestore"
import db, { auth } from '../../Config/FirebaseConfig' 

function LoginGoogle() {

  const handleGoogleSignin = () => {
    try{
      const provider = new GoogleAuthProvider()
      signInWithPopup(auth, provider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const user = result.user;
          // ADD USER DATA TO DATABASE
            addDoc(collection(db, "users"), {
              displayName: user.displayName,
              email: user.email,
              userId: user.uid,
              profilePhoto: user.photoURL
            })
          // STORE USERINFO TO LOCALSTORAGE
            localStorage.setItem("user", JSON.stringify(user))
            setUserInfo(user)        
        }).catch((error) => {
          console.error(error)
          alert('there is a problem encountered while signing in.')
        });
    }catch(error) {
      console.error(error)
    }
  }

  return (
    <div className='w-full'>
      <button className='py-1 md:py-[0.15rem] rounded-md w-full
                        text-[#2351A7] text-sm bg-white/60
                        md:border-[0.1rem] md:border-[#2351A7]
                        hover:shadow-md hover:translate-y-0.5 duration-200
                        md:text-md font-bold tracking-widest'
              onClick={handleGoogleSignin}>
        Google
      </button>
    </div>
  )
}

export default LoginGoogle