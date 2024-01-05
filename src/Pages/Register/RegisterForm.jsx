import React, { useContext, useEffect, useState } from 'react'
import Context from '../../Context/Context'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { storage } from '../../Config/FirebaseConfig'

function RegisterForm() {

  const [ uploading, setUploading ] = useState(false)

  // CONTEXT
    const {
            userInfo, 
            firstname, setFirstName,
            lastname, setLastname,
            username, setUsername,
            isEmail, setIsEmail,
            dob, setDob,
            isPassword, setIsPassword,
            isConfirmPassword, setIsConfirmPassword,
            profilePhoto, setProfilePhoto
          } = useContext(Context)

  // UPLOAD PHOTO TO STORAGE (profilePictures)
    const handleUploadProfilePhoto = () => {
      try{
        if (profilePhoto !== "" && profilePhoto.name !== undefined) {
          const imageName = new Date().getTime().toString() + profilePhoto.name
          const storageRef = ref(storage, `profilePictures/${imageName}`)
          const uploadTask = uploadBytesResumable(storageRef, profilePhoto)
          uploadTask.on('state_changed', 
          (snapshot) => {
            switch (snapshot.state) {
              case 'running':
                setProfilePhoto("")
                break;
            }
          }, 
          (error) => { console.error(error)},
          // DOWNLOAD PROFILE PICTURE URL
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setProfilePhoto(downloadURL)
                setUploading(false)
              });
            }
          );
        }
      }catch(error) {
        console.error(error)
      }
    }

    useEffect(() => {
      handleUploadProfilePhoto() 
    }, [profilePhoto])

    console.log("profilePhoto", profilePhoto)
  
  return (
    <div className='border-b border-slate-700 pb-4 px-5'>
      {/* IMAGE PREVIEW */}
      <div className='flex justify-center py-2'>
        {
          profilePhoto === ""
            ? <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" 
                    className={
                      !uploading
                        ? "w-20 h-20 border-2 border-gray-300 rounded-full p-2 text-gray-300 bg-gray-100"
                        : "w-20 h-20 border-2 border-gray-300 rounded-full p-2 text-gray-300 bg-gray-100 animate-pulse"
                    }>
                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
              </svg>
            : <img  src={profilePhoto} 
                    alt="Profile Photo" 
                    className='w-24 h-24 rounded-full object-cover'
              />
        }
        
      </div>
      {/* IMAGE */}
      <div className='flex justify-center py-2'>
        <input  type="file"
                name='profilePhoto'
                id='profilePhoto'
                onChange={e => {setProfilePhoto(e.target.files[0])}}
                className='hidden'
        />
        <label htmlFor="profilePhoto"
                className='text-sm bg-blue flex items-center justify-center gap-1 
                            text-[#2351A7] font-semibold
                            hover:translate-y-0.5 duration-200 cursor-pointer'
                onClick={() => { setUploading(true) }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
          </svg>

          Upload Photo
        </label>
      </div>
      {/* name */}
      <div className='grid grid-cols-2 gap-2 mb-2'>
        <input  type="text"
                  name='firstname'
                  placeholder='First Name'
                  value={firstname}
                  onChange={e => {setFirstName(e.target.value)}}
                  className='indent-2 py-1 rounded focus:outline-none col-span-1
                              text-slate-600 text-xs sm:text-sm bg-white/60 placeholder:text-slate-600
                              md:text-md border border-slate-300'
        />
        <input  type="text"
                  name='lastname'
                  placeholder='Last Name'
                  value={lastname}
                  onChange={e => {setLastname(e.target.value)}}
                  className='indent-2 py-1 rounded focus:outline-none col-span-1
                              text-slate-600 text-xs sm:text-sm bg-white/60 placeholder:text-slate-600
                              md:text-md border border-slate-300'
        />
      </div>
      {/* Username and DOB */}
      <div className='grid grid-cols-2 gap-2 mb-2'>
        <input  type="text"
                  name='username'
                  placeholder='Username'
                  value={username}
                  onChange={e => {setUsername(e.target.value)}}
                  className='indent-2 py-1 rounded focus:outline-none col-span-1
                              text-slate-600 text-xs sm:text-sm bg-white/60 placeholder:text-slate-600
                              md:text-md border border-slate-300'
        />
        <input  type="text"
                name='dateOfBirth'
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
                placeholder='Date of Birth'
                value={dob}
                onChange={e => {setDob(e.target.value)}}
                className='ps-2 py-1 rounded focus:outline-none col-span-1 text-slate-600 text-xs sm:text-sm
                        bg-white/60 placeholder:text-slate-600 md:text-md border border-slate-300'
        />
      </div>
      {/* Email */}
      <div>
        <input  type="email"
                name='email'
                placeholder='Email'
                value={isEmail}
                onChange={e => {setIsEmail(e.target.value)}}
                className='indent-2 py-1 rounded focus:outline-none w-full mb-2
                            text-slate-600 text-xs sm:text-sm bg-white/60 placeholder:text-slate-600
                            md:text-md border border-slate-300'
        />         
      </div>
      {/* Password */}
      <div className='grid grid-cols-2 gap-2'>
        <input  type="password"
                  name='password'
                  placeholder='Password'
                  value={isPassword}
                  onChange={e => {setIsPassword(e.target.value)}}
                  className='indent-2 py-1 rounded focus:outline-none col-span-1
                              text-slate-600 text-xs sm:text-sm bg-white/60 placeholder:text-slate-600
                              md:text-md border border-slate-300'
        />
        <input  type="password"
                  name='confrimPassword'
                  placeholder='Confirm Password'
                  value={isConfirmPassword}
                  onChange={e => {setIsConfirmPassword(e.target.value)}}
                  className='indent-2 py-1 rounded focus:outline-none col-span-1
                              text-slate-600 text-xs sm:text-sm bg-white/60 placeholder:text-slate-600
                              md:text-md border border-slate-300'
        />
      </div>
    </div>
  )
}

export default RegisterForm