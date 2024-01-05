import React, { useContext } from 'react'
import Context from '../../Context/Context'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { collection, addDoc} from "firebase/firestore"
import db, { auth } from '../../Config/FirebaseConfig'

function RegisterSignup() {

  // CONTEXT
  const {
    setUserInfo,
    firstname,
    lastname,
    username,
    isEmail,
    dob,
    isPassword,
    isConfirmPassword,
    profilePhoto,
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
        // CURRENT USER INFO
          const user = {
            ...u,
            lastname: lastname,
            displayName: username,
            dob: dob,
            email: isEmail,
            userId: u.uid,
            profilePhoto: profilePhoto
          }
          console.log(user)
        // ADD USER DATA TO DATABASE
          addDoc(collection(db, "users"), {
            firstname: firstname,
            lastname: lastname,
            displayName: username,
            dob: dob,
            email: isEmail,
            userId: u.uid,
            profilePhoto: profilePhoto
          })
        // STORE USERINFO TO LOCALSTORAGE
          localStorage.setItem("user", JSON.stringify(user))
          setUserInfo(user)
      })
      .catch((error) => {
        console.log(error)
          alert('Error in Creating an account.')
      })
    }catch(error) {
      console.error(error)
    }
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