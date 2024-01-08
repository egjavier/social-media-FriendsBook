import React, { useContext, useEffect, useState } from 'react'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { storage } from '../../Config/FirebaseConfig'
import Context from '../../Context/Context'

function AddImagePost() {

  const [ postImage, setPostImage ] = useState([])

  // CONTEXT
  const { uploadedMedia, setUploadedMedia } = useContext(Context)

  const handleUploadMedia = () => {
    try{
      if (postImage !== "" && postImage.name !== undefined) {
        const imageName = new Date().getTime().toString() + postImage.name
        const storageRef = ref(storage, `postImages/${imageName}`)
        const uploadTask = uploadBytesResumable(storageRef, postImage)
  
        uploadTask.on('state_changed', 
          (snapshot) => {
            switch (snapshot.state) {
              case 'running':
                console.log('Upload is running');
                setUploadedMedia("")
                break;
            }
          }, 
          (error) => {
            console.error(error)
          }, 
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log('File available at', downloadURL);
              setUploadedMedia(downloadURL)
            });
          }
        );
      }
    }catch(e) {
      console.error(e)
    }
  }

  useEffect(() => {
    handleUploadMedia()
  }, [postImage])

  return (
    <div>
      {/* IMAGE PREVIEW */}
      <div className={
                       uploadedMedia === ""
                        ? "hidden"
                        : "block"
                      }>
        <img  src={uploadedMedia}
              alt="Image to be posted" />
      </div>

      {/* FORM */}
      <div>
        <input  type='file'
                id='uploadPhoto'
                className='hidden'
                onChange={e => setPostImage(e.target.files[0])}
        />
        <label className='flex gap-2 justify-center items-center text-sm
                          cursor-pointer hover:text-[#2351A7]'
                htmlFor='uploadPhoto'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
          </svg>
          <p>
            Photo / Video
          </p>
        </label>
      </div>
    </div>
  )
}

export default AddImagePost