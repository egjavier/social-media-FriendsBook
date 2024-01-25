import React, { useContext, useEffect, useState } from 'react'
import Context from '../../Context/Context'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { collection, getDocs, query, orderBy, where, doc, updateDoc } from "firebase/firestore"
import db, { storage } from '../../Config/FirebaseConfig'
import { useNavigate } from 'react-router-dom'

function EditProfilePage() {

  const [ photo, setPhoto ] = useState("")
  const [ fname, setFname ] = useState("")
  const [ lname, setLname ] = useState("")
  const [ dob, setDob ] = useState("")
  const [ uname, setUname] = useState("")

  const [ uploadedPhoto, setUploadedPhoto ] = useState("")
  const [ uploadProgress, setUploadProgress ] = useState("")  
  const navigate = useNavigate()

  // CONTEXT
  const {
          userInfo, setUserInfo
        } = useContext(Context)

  // UPDATE BTN
  const handleUpdateBtn = async () => {
    try{
      if(
        fname !== "" ||
        lname !== "" ||
        uname !== "" ||
        dob !== "" ||
        photo !== ""
      ) {
        // UPDATE USER'S INFO FROM USERS COLLECTION
          const userRef = doc(db, "users", userInfo.id)
          await updateDoc(userRef, {
            profilePhoto: uploadedPhoto !== "" ? uploadedPhoto : userInfo.profilePhoto,
            firstname: fname !== "" ? fname : userInfo.firstname,
            lastname: lname !== "" ? lname : userInfo.lastname,
            displayName: uname !== "" ? uname : userInfo.displayName,
            dob: dob !== "" ? dob : userInfo.dob,
          })

        // FETCH USER'S NEW INFO FROM USERS COLLECTION
          const querySnapshot = await getDocs(collection(db, "users"));
          const users = querySnapshot.docs.map( e => ({...e.data(), id: e.id})) 
          users.map(e => {
            if (e.email === userInfo.email ) {

              // STORE USERINFO TO LOCALSTORAGE
              localStorage.setItem("user", JSON.stringify(e))
              setUserInfo(e)
            }
          })

        // CHANGE ALL PREVIOUS POSTS INFO
          const qPosts = query(collection(db, "posts"), where("email", "==", userInfo.email))
          const querySnapshotPosts = await getDocs(qPosts)

          querySnapshotPosts.forEach((docu) => {
            // fetch all user's posts
            const arrayPosts = []
            const dPsots = {...docu.data(), id: docu.id}
            arrayPosts.push(dPsots)
    
            arrayPosts.map((p) => {
              // update user's info in all of user's posts
              const ref = doc(db, "posts", p.id)
              updateDoc(ref, {
                profilePhoto: uploadedPhoto !== "" ? uploadedPhoto : userInfo.profilePhoto,
                firstname: fname !== "" ? fname : userInfo.firstname,
                lastname: lname !== "" ? lname : userInfo.lastname,
                displayName: uname !== "" ? uname : userInfo.displayName,
                dob: dob !== "" ? dob : userInfo.dob,
            })
          })
          })

        // CHANGE ALL GALLERY INFO
        const qGallery = query(collection(db, "gallery"), where("email", "==", userInfo.email))
        const querySnapshotGallery = await getDocs(qGallery)

        querySnapshotGallery.forEach((item) => {
          // fetch all user's posts
          const arrayGallery = []
          const qGallery = {...item.data(), id: item.id}
          arrayGallery.push(qGallery)
  
          arrayGallery.map((p) => {
            // update user's info in all of user's posts
            const ref = doc(db, "gallery", p.id)
            updateDoc(ref, {
              profilePhoto: uploadedPhoto !== "" ? uploadedPhoto : userInfo.profilePhoto,
              firstname: fname !== "" ? fname : userInfo.firstname,
              lastname: lname !== "" ? lname : userInfo.lastname,
              displayName: uname !== "" ? uname : userInfo.displayName,
              dob: dob !== "" ? dob : userInfo.dob,
          })
        })
        })


        // ALERT
        alert("Update has been saved.")
        
        // NAVIGATE TO HOME PAGE
        navigate('/home')

      } else {
        alert("All Fields Should not be empty.")
      }

    }catch(e){
      console.error()
    }
  }

  // UPLOAD PHOTO TO STORAGE
  const uploadPhoto =() => {
    try {

      if (photo !== "" || photo.name !== undefined) {
        // create name and refs
          const imageName = new Date().getTime().toString() + photo.name
          const storageRef = ref(storage, `postImages/${imageName}`)
          const uploadTask = uploadBytesResumable(storageRef, photo)
  
        //upload image on storage
        uploadTask.on('state_changed', 
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress('Upload is ' + progress.toString().slice(0, 5) + '% done')
            switch (snapshot.state) {
              case 'running':
                setUploadedPhoto("")
                break;
            }
          }, 
          (error) => {
            console.error(error)
          }, 
          () => {
            //download image link from storage
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setUploadedPhoto(downloadURL)
            });
          }
        )
      }

    } catch(e) {
      console.error(e)
    }
  }

  useEffect(() => {
    uploadPhoto()
  }, [photo])

  return (
    <section className='editProfile min-h-screen max-w-[1200px] p-5 mx-auto bg-white
                        flex flex-col gap-10 pt-10'>

      {/* EDIT PROFILE PICTURE */}
      <div className='flex flex-col justify-center items-center max-w-[600px] mx-auto p-5 w-full'>

        {/* IMAGE PREVIEW */}
        <div className={
                        uploadedPhoto === ""
                          ? "hidden"
                          : "block"
                        }>
          <img  src={uploadedPhoto}
                alt="Profile Photo" 
                className='w-28 h-28 border rounded-full mb-3 object-cover'/>
        </div>

        {/* PROGRESS */}
        <div className= {
                          uploadProgress < 1 || uploadProgress === 'Upload is 100% done'
                            ? "hidden"
                            : 'block text-center text-xs italic font-semi-bold my-3'
                        }>
          {uploadProgress}
        </div>

        {/* UPLOAD BUTTON */}
        <input  type='file'
                id='editProfilePhoto'
                className='hidden'
                defaultValue={photo}
                onChange={e => setPhoto(e.target.files[0])}
        />
        <label className='flex gap-2 justify-center items-center text-sm
                          cursor-pointer hover:text-[#2351A7]'
                htmlFor='editProfilePhoto'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
          </svg>
          <p>
            New Profile Photo
          </p>
        </label>

      </div>

      {/* EDIT INFO FORM */}
      <div className='text-center p-2 max-w-[600px] mx-auto w-full'>
        <div className='border-b border-t border-slate-700 p-4 px-5'>
          {/* name */}
          <div className='grid grid-cols-2 gap-2 mb-2'>
            <input  type="text"
                      name='editFirstname'
                      placeholder={userInfo.firstname}
                      value={fname}
                      onChange={e => {setFname(e.target.value)}}
                      className='indent-2 py-1 rounded focus:outline-none col-span-1
                                  text-slate-600 text-xs sm:text-sm bg-white/60 placeholder:text-slate-600
                                  md:text-md border border-slate-300'
            />
            <input  type="text"
                      name='editLastname'
                      placeholder={userInfo.lastname}
                      value={lname}
                      onChange={e => {setLname(e.target.value)}}
                      className='indent-2 py-1 rounded focus:outline-none col-span-1
                                  text-slate-600 text-xs sm:text-sm bg-white/60 placeholder:text-slate-600
                                  md:text-md border border-slate-300'
            />
          </div>
          {/* Username and DOB */}
          <div className='grid grid-cols-2 gap-2 mb-2'>
            <input  type="text"
                      name='EditUsername'
                      placeholder={userInfo.displayName}
                      value={uname}
                      onChange={e => {setUname(e.target.value)}}
                      className='indent-2 py-1 rounded focus:outline-none col-span-1
                                  text-slate-600 text-xs sm:text-sm bg-white/60 placeholder:text-slate-600
                                  md:text-md border border-slate-300'
            />
            <input  type="text"
                    name='EditDateOfBirth'
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                    placeholder={userInfo.dob}
                    value={dob}
                    onChange={e => {setDob(e.target.value)}}
                    className='ps-2 py-1 rounded focus:outline-none col-span-1 text-slate-600 text-xs sm:text-sm
                            bg-white/60 placeholder:text-slate-600 md:text-md border border-slate-300'
            />
          </div>
        </div>     
      </div>

      {/* SAVE BUTTON */}
      <div className='text-center p-2 max-w-[600px] mx-auto w-full'>
        <button className= 'bg-[#2351A7] py-1 rounded-md text-sm hover:shadow-md hover:translate-y-0.5 duration-200 mx-auto md:text-md text-white font-bold tracking-widest w-full'
                onClick={handleUpdateBtn}>
            Update
        </button>
      </div>
    </section>
  )
}

export default EditProfilePage