import React, { useContext, useEffect, useState } from 'react'
import Context from '../../../Context/Context'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { collection, addDoc, Timestamp  } from "firebase/firestore"
import db, { storage } from '../../../Config/FirebaseConfig'

function AddStoryModal() {

  const [ uploadProgress, setUploadProgress ] = useState("")
  const [ isRunning, setIsRunning ] = useState(false)

  // CONTEXT
  const {
          userInfo, 
          storyUrl, setStoryUrl,
          storyName, setStoryName,
          setIsNewStory
        } = useContext(Context)

  const handleAddStory =() => {
    try{
      if (storyName !== "" && storyName.name !== undefined) {
        const storyFileName = new Date().getTime().toString() + storyName.name
        const storageRef = ref(storage, `stories/${storyFileName}`)
        const uploadTask = uploadBytesResumable(storageRef, storyName)

        uploadTask.on('state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress('Upload is ' + progress.toString().slice(0, 5) + '% done')
            switch (snapshot.state) {
              case 'running':
                setIsRunning(true)
                break;
            }
          }, 
          (error) => {
            console.error(error)
          }, 
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setIsRunning(false)
              setStoryUrl(downloadURL)
            });
          }
        );
      }
    } catch(e) {
      console.error(e)
    }
  }

  const emptyFields = () => {
    setStoryUrl("")
    setStoryName("")
    setUploadProgress("")
    setIsRunning(false)
  }

  useEffect(() => {
    handleAddStory()
  }, [storyName])

  // ADD STORY BUTTON
    const handleAddStoryBtn = async() => {
      try {
        if(storyUrl !== "") {
          addDoc(collection(db, "stories"), {
            firstname: userInfo.firstname,
            lastname: userInfo.lastname,
            displayName: userInfo.displayName,
            email: userInfo.email,
            profilePhoto: userInfo.profilePhoto,
            timestamp: Timestamp.fromDate(new Date()),
            storyUrl: storyUrl
          })

          setIsNewStory(true)
        }

        alert('Upload Successsful!')
        document.getElementById('addStoryModal').close()

        // EMPTY FIELDS
        setStoryUrl("")
        setStoryName("")
        setUploadProgress("")
      }catch(e) {
        console.error(e)
      }
    }

  return (
    <dialog id="addStoryModal" className="modal modal-middle">
      <div className="modal-box">
        {/* TITLE */}
          <div className='flex justify-between items- mb-3'>
            <p className='font-semibold'>
              Add Story
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

          {/* USER IMAGE IMAGE */}
          <div className='mt-3 grid grid-cols-12 items-center '>
            {/* image */}
            <img src={userInfo.profilePhoto}
                  alt={userInfo.displayName + '\'s Profile Picture'}
                  className='w-16 h-16 rounded-full object-cover col-span-2'/>
            <p className='font-semibold'>
              {userInfo.displayName}
            </p>
          </div>

          {/* UPLOAD IMAGE */}
          <div className='my-3 w-full'>
            {/* IMAGE PREVIEW */}
            <div className={
                              storyUrl === ""
                                ? "hidden"
                                : "block"
                            }>
              <img  src={storyUrl} 
                    alt="story" 
              />
            </div>

            {/* PROGRESS */}
            <div className= {
                              uploadProgress < 1 || uploadProgress === 'Upload is 100% done'
                                ? "hidden"
                                : 'block text-center text-xs italic font-semi-bold my-3'
                            }>
              {uploadProgress}
            </div>

            {/* UPLAD IMAGE */}
            <div className={
                              uploadProgress === 'Upload is 100% done'
                                ? 'hidden'
                                : 'my-3'
                            }>
              <input  type='file'
                      id='storyPhoto'
                      className='hidden'
                      defaultValue={storyName}
                      onChange={e => setStoryName(e.target.files[0])}
              />
              <label className='flex gap-2 justify-center items-center text-sm
                                cursor-pointer hover:text-[#2351A7]'
                      htmlFor='storyPhoto'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                </svg>
                <p>
                  Add Image/Video
                </p>
              </label>
            </div>
          </div>
          <hr />

          {/* ADD STORY BUTTON */}
          <div>
            <button className={
                                storyUrl !== ""
                                  ? 'mt-3 btn btn-block btn-sm bg-[#2351A7]/90 text-white tracking-wider hover:bg-[#2351A7]'   
                                  : 'mt-3 btn btn-block btn-sm btn-disabled tracking-wider'                  
                              }
                    onClick={handleAddStoryBtn}>
              Add Story
            </button>  
          </div>

      </div>
    </dialog>  )
}

export default AddStoryModal