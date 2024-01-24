import React, { useContext, useEffect, useState } from 'react'
import Context from '../../Context/Context'
import { doc, updateDoc, getDocs, collection } from "firebase/firestore"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import db, { storage } from '../../Config/FirebaseConfig'
import { useNavigate, useParams } from 'react-router-dom'

function ThumbnailModal() {

  const [ isUpdated, setIsUpdated ] = useState(false)
  const [ uploadProgress, setUploadProgress ] = useState("")
  const [ thumbnailImage, setThumbnailImage ] = useState("")
  const { id } = useParams()
  
  const navigate = useNavigate()

  // CONTEXT
  const { 
          userInfo, setUserInfo,
          uploadedThumbnail, setUploadedThumbnail,
          setAllUsers
        } = useContext(Context)

  // UPLOAD/UPDATE THUMBNAIL
  const handleUpdateThumbnail =() => {
    try{
      if (thumbnailImage !== "" && thumbnailImage.name !== undefined) {
        const imageName = new Date().getTime().toString() + thumbnailImage.name
        const storageRef = ref(storage, `postImages/${imageName}`)
        const uploadTask = uploadBytesResumable(storageRef, thumbnailImage)
  
        uploadTask.on('state_changed', 
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress('Upload is ' + progress.toString().slice(0, 5) + '% done')
            switch (snapshot.state) {
              case 'running':
                setUploadedThumbnail("")
                break;
            }
          }, 
          (error) => {
            console.error(error)
          }, 
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setUploadedThumbnail(downloadURL)
            });
          }
        );
      }
    }catch(e) {
      console.error(e)
    }
  }

  // SAVE THUMBNAIL
  const handleSaveThumbnail = async() => {
    try{
      if(thumbnailImage !== "" && userInfo.userId === id) {
        const thumbnailRef = doc(db, "users", userInfo.id)
        await updateDoc(thumbnailRef, {
          thumbnail: uploadedThumbnail
        });

        fetch()

      }else {
        alert("Either there's no image to upload or You don't have access to this account.")
      }
    }catch(e){
      console.error(e)
    }

    setUploadedThumbnail("")
    setUploadProgress("")
  }

  useEffect(() => {
    handleUpdateThumbnail()
  }, [thumbnailImage])
  
  useEffect(() => {
    setIsUpdated(false)
  }, [])

  if (isUpdated === true) {
    navigate('/home')
  }

  const fetch = async() => {
    // FETCH DATA
    const querySnapshot = await getDocs(collection(db, "users"));
    const users = querySnapshot.docs.map( e => ({...e.data(), id: e.id})) 
    users.map(e => {
      if (e.email === userInfo.email ) {

      // STORE USERINFO AND ALLUSERS TO LOCALSTORAGE
      localStorage.setItem("user", JSON.stringify(e))
      setUserInfo(e)
      localStorage.setItem("allUsers", JSON.stringify(e))
      setAllUsers(e)
      }
    })
    
    setIsUpdated(true)

}

const emptyFields = () => {
  setUploadedThumbnail("")
  setUploadProgress("")
}

  return (
    <dialog id="thumbnailModal" className="modal">
      <div className="modal-box">
        {/* TITLE */}
        <div className='flex justify-between items- mb-3'>
            <p className='font-semibold'>
              Change Thumbnail
            </p>
            <div className='modal-action mt-0'>
              <form method='dialog'>
                <button className=' font-black cursor-pointer hover:scale-110 duration-300
                                  w-8 h-8 rounded-full hover:shadow-lg'
                        onClick={emptyFields}
                        >
                    X
                </button>
              </form>
            </div>
          </div>
          
          <hr />
        
        {/* THUMBNAIL PREVIEW */}
        <div className={
                       uploadedThumbnail === ""
                        ? "hidden"
                        : "block"
                      }>
          <img  src={uploadedThumbnail} 
                alt="Thumbnail" 
                className=''/>
        </div>

          
        {/* PROGRESS */}
        <div className= {
                          uploadProgress < 1 || uploadProgress === 'Upload is 100% done'
                            ? "hidden"
                            : 'block text-center text-xs italic font-semi-bold my-3'
                        }>
          {uploadProgress}
        </div>

        {/* UPLOAD THUMBNAIL */}
        <div className={
                        uploadProgress === 'Upload is 100% done'
                          ? 'hidden'
                          : 'my-3'
                      }>
          <input  type='file'
                  id='thumbnailPhoto'
                  className='hidden'
                  onChange={e => setThumbnailImage(e.target.files[0])}>
          </input>
          <label className='flex gap-2 justify-center items-center text-sm
                            cursor-pointer hover:text-[#2351A7]'
                  htmlFor='thumbnailPhoto'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
            </svg>
            <p>
              Upload Thumbnail
            </p>
          </label>
        </div>

        <div className="modal-action">
          <form method="dialog">
            {/* UPLOAD BTN */}
            <button className={
                                uploadedThumbnail !== ""
                                  ? 'btn btn-block btn-sm bg-[#2351A7]/90 text-white tracking-wider hover:bg-[#2351A7]'   
                                  : 'btn btn-block btn-sm btn-disabled tracking-wider'                  
                              }
                    onClick={handleSaveThumbnail}>
              Upload
            </button>
          </form>
        </div>

      </div>
    </dialog>
  )
}

export default ThumbnailModal