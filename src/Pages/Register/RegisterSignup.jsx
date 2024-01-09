import React, { useContext } from 'react'
import Context from '../../Context/Context'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { collection, addDoc, getDocs} from "firebase/firestore"
import db, { auth } from '../../Config/FirebaseConfig'

function RegisterSignup() {

  // CONTEXT
  const {
    setUserInfo, userInfo,
    firstname,
    lastname,
    username,
    isEmail,
    dob,
    isPassword,
    isConfirmPassword,
    profilePhoto,
    thumbnail,
  } = useContext(Context)

  // CREATING A USER
  const handleSignUp = () => {

    const email = isEmail
    const password = isPassword

    try{
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const u = userCredential.user;
        // ADD DISPLAYNAME
          updateProfile(auth.currentUser, {
            displayName: username,
          })
        // ADD USER DATA TO DATABASE
          addDoc(collection(db, "users"), {
            firstname: firstname,
            lastname: lastname,
            displayName: username,
            dob: dob,
            email: isEmail,
            userId: u.uid,
            profilePhoto: profilePhoto,
            thumbnail: thumbnail
          })
        // STORE USERINFO TO LOCALSTORAGE
          fetch(u)
          console.log("userInfo", userInfo)
      })
      .catch((error) => {
        console.log(error)
          alert('Error in Creating an account.')
      })
    }catch(error) {
      console.error(error)
    }
  }

  const fetch = async(u) => {
    // FETCH DATA
    const querySnapshot = await getDocs(collection(db, "users"));
    const users = querySnapshot.docs.map( e => ({...e.data(), id: e.id})) 
    console.log("users", users) 
    users.map(e => {
      if (e.email === u.email ) {

      // STORE USERINFO TO LOCALSTORAGE
      localStorage.setItem("user", JSON.stringify(e))
      setUserInfo(e)
      }
    })
}

  return (
    <div className='flex flex-col gap-2 mb-2'>
      <p className='text-[0.70rem] md:text-xs text-slate-600 leading-4 
                      px-5 mt-1 md:mt-2 italic'>
        By clicking Sign Up, you agree to our Terms, Privacy Policy and Cookies Policy.
      </p>
      <button className={(  firstname !== "" &&
                            lastname !== "" &&
                            username !== "" &&
                            isEmail !== "" &&
                            dob !== "" &&
                            isPassword !== "" &&
                            isConfirmPassword !== "" &&
                            isPassword === isConfirmPassword &&
                            profilePhoto !== ""
                          ) ? 'bg-[#2351A7] py-1 rounded-md text-sm hover:shadow-md hover:translate-y-0.5 duration-200 w-2/3 mx-auto md:text-md text-white font-bold tracking-widest'
                            : 'bg-slate-300 py-1 rounded-md text-sm w-2/3 mx-auto md:text-md text-white font-bold tracking-widest pointer-events-none'
                        }
              onClick={handleSignUp}>
          Sign Up
      </button>
    </div> 
  )
}

export default RegisterSignup