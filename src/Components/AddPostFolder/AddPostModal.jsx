import React, { useContext } from 'react'
import Context from '../../Context/Context'
import PostBtn from './PostBtn'
import AddImagePost from './AddImagePost'

function AddPostModal() {

  // CONTEXT
  const { 
          userInfo, 
          setUploadedMedia,
          postText, setPostText,
          postPrivacy, setPostPrivacy
        } = useContext(Context)

  const emptyFields = () => {
    setPostText("")
    setUploadedMedia("")
    setPostPrivacy('Public')
  }

  return (
    <dialog id="addPostModal" className="modal">
      <div className="modal-box">
        {/* TITLE */}
          <div className='flex justify-between items- mb-3'>
            <p className='font-semibold'>
              Create Post
            </p>
            <div className='modal-action mt-0'>
              <form method='dialog'>
                <button className=' font-black cursor-pointer hover:scale-110 duration-300
                                  w-8 h-8 rounded-full hover:shadow-lg'
                        onClick={emptyFields}>
                    X
                </button>
              </form>
            </div>
          </div>
          
          <hr />

          {/* IMAGE AND PRIVACY */}
          <div className='mt-3 grid grid-cols-12 items-center '>
            {/* image */}
            <img src={userInfo.profilePhoto}
                  alt={userInfo.displayName + '\'s Profile Picture'}
                  className='w-16 h-16 rounded-full object-cover col-span-2'/>
            {/* privacy */}
            <div className='flex justify-between items-center px-2 col-span-10'>
              <p className='font-semibold'>
                {userInfo.displayName}
              </p>
              <select className='focus:outline-none font-semibold text-xs
                                  border px-2 py-1 rounded-full text-slate-500 cursor-pointer'
                      value={postPrivacy}
                      onChange={e => setPostPrivacy(e.target.value)}>
                <option className='italic text-sm text-slate-500'>Public</option>
                <option className='italic text-sm text-slate-500 '>Friends</option>
                <option className='italic text-sm text-slate-500 '>Only Me</option>
              </select>
            </div>
          </div>

          {/* TEXTAREA */}
          <textarea className='mt-3 p-2 w-full h-48 placeholder:italic
                              focus:outline-none resize-none bg-gray-100 overflow-scroll rounded-lg'
                    placeholder='Say your thoughts...'
                    value={postText}
                    onChange={e => setPostText(e.target.value)}/>

          <div className='my-3 w-full'>
            <AddImagePost />
          </div>
          <hr />
          <PostBtn />

      </div>
    </dialog>
  )
}

export default AddPostModal