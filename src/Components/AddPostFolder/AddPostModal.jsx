import React, { useContext } from 'react'
import Context from '../../Context/Context'
import PostBtn from './PostBtn'

function AddPostModal() {

  // CONTEXT
  const { userInfo } = useContext(Context)

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
                                  w-8 h-8 rounded-full hover:shadow-lg'>
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
                                  border px-2 py-1 rounded-full text-slate-500 cursor-pointer'>
                <option className='italic text-sm text-slate-500'>Public</option>
                <option className='italic text-sm text-slate-500 '>Friends</option>
                <option className='italic text-sm text-slate-500 '>Only Me</option>
              </select>
            </div>
          </div>

          {/* TEXTAREA */}
          <textarea className='mt-3 p-2 w-full h-48 placeholder:italic
                        focus:outline-none resize-none bg-gray-100 overflow-scroll rounded-lg'
              placeholder='Say your thoughts...' />

          {/* ADD IMAGE */}
          <div className='my-3 w-full'>
            <input  type='file'
                    id='uploadPhoto'
                    className='hidden'/>
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

          <hr />
          <PostBtn />

      </div>
    </dialog>
  )
}

export default AddPostModal