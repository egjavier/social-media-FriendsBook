import React, { useContext } from 'react'
import db, { auth } from '../../Config/FirebaseConfig'
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore"
import Context from '../../Context/Context';

function LoginBtn({userEmail, userPassword}) {

  // CONTEXT
  const { setUserInfo } = useContext(Context)

  const email = userEmail
  const password = userPassword
  
  const handleSignin = () => {
    if (userEmail !== "" && userPassword !== "") {
      try{
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log('user logged in')

          // FETCH DATA
            fetch(user)

          })
          .catch((error) => {
            console.error(error)
            alert("Invalid credential. Try again.")
          });
      } catch(error) {
        console.error(error)
      }
    } else {
      alert('Missing fields!')
    }
  }

  const fetch = async(user) => {
    // FETCH DATA
    const querySnapshot = await getDocs(collection(db, "users"));
    const users = querySnapshot.docs.map( e => ({...e.data(), id: e.id})) 
    console.log("users", users) 
    users.map(e => {
      if (e.email === user.email ) {

      // STORE USERINFO TO LOCALSTORAGE
      localStorage.setItem("user", JSON.stringify(e))
      setUserInfo(e)
      }
    })
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