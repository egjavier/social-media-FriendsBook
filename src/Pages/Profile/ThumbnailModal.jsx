import React, { useContext, useEffect, useState } from 'react'
import Context from '../../Context/Context'
import { doc, updateDoc, getDocs, collection } from "firebase/firestore"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import db, { storage } from '../../Config/FirebaseConfig'

function ThumbnailModal() {

  const [ isUploading, setIsUploading ] = useState(false)

  // CONTEXT
  const { 
          thumbnail, setThumbnail,
          userInfo, setUserInfo,
          uploadedThumbnail, setUploadedThumbnail
        } = useContext(Context)

  // UPLOAD/UPDATE THUMBNAIL
  const handleUpdateThumbnail =() => {
    try{
      if (thumbnail !== "" && thumbnail.name !== undefined) {
        const imageName = new Date().getTime().toString() + thumbnail.name
        const storageRef = ref(storage, `postImages/${imageName}`)
        const uploadTask = uploadBytesResumable(storageRef, thumbnail)
  
        uploadTask.on('state_changed', 
          (snapshot) => {
            switch (snapshot.state) {
              case 'running':
                console.log('Upload is running');
                setUploadedThumbnail("")
                setIsUploading(true)
                break;
            }
          }, 
          (error) => {
            console.error(error)
          }, 
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log('File available at', downloadURL);
              setUploadedThumbnail(downloadURL)
              setIsUploading(false)
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
      if(thumbnail !== "") {
        const thumbnailRef = doc(db, "users", userInfo.id)
        await updateDoc(thumbnailRef, {
          thumbnail: uploadedThumbnail
        });

        fetch()
        
      }else {
        alert("Image should not be empty!")
      }
    }catch(e){
      console.error(e)
    }

    setUploadedThumbnail("")
  }

  useEffect(() => {
    handleUpdateThumbnail()
  }, [thumbnail])

  const fetch = async() => {
    // FETCH DATA
    const querySnapshot = await getDocs(collection(db, "users"));
    const users = querySnapshot.docs.map( e => ({...e.data(), id: e.id})) 
    console.log("users", users) 
    users.map(e => {
      if (e.email === userInfo.email ) {

      // STORE USERINFO TO LOCALSTORAGE
      localStorage.setItem("user", JSON.stringify(e))
      setUserInfo(e)
      }
    })
}

  return (
    <dialog id="thumbnailModal" className="modal">
      <div className="modal-box">
        <div className='mb-3'>
          {/* UPLOAD THUMBNAIL */}
          <input  type='file'
                  id='uploadPhoto'
                  className='hidden'
                  onChange={e => setThumbnail(e.target.files[0])}>
          </input>
          <label className='flex gap-2 justify-center items-center text-sm
                            cursor-pointer hover:text-[#2351A7]'
                  htmlFor='uploadPhoto'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
            </svg>
            <p>
              Upload Thumbnail
            </p>
          </label>
        </div>
        <hr/>

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

        <div className="modal-action">
          <form method="dialog">
            {/* UPLOAD BTN */}
            <button className="btn btn-sm bg-[#2351A7]/90 text-white tracking-wider hover:bg-[#2351A7] me-2">
              Close
            </button>
            <button className={
                                !isUploading 
                                  ? "btn btn-sm bg-[#2351A7]/90 text-white tracking-wider hover:bg-[#2351A7]"
                                  : "btn btn-sm btn-disabled" 
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