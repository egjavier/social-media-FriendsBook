import React, { useContext } from 'react'
import Context from '../../Context/Context'
import AddPostModal from './AddPostModal'

function AddPost() {

  // CONTEXT
    const { userInfo } = useContext(Context)
    
  // SHOW MODAL USING DAISY UI
    const showPostModal = () => {
      document.getElementById('addPostModal').showModal()
    }

  // ADD IMAGE MO
    const handleAddImage = () => {
      alert('add image')
    }

  return (
    <section className='addPost border rounded-xl overflow-hidden py-2'>

      <div className='grid grid-cols-7 py-2 px-5'>
        <img src={userInfo.profilePhoto}
              alt='Profile Picture'
              className='w-12 h-12 rounded-full object-cover col-span-1'
        />
        <p  className='border col-span-6 rounded-3xl indent-3 text-sm md:text-base cursor-pointer
                    flex justify-start items-center text-gray-500 italic bg-gray-100'
            onClick={showPostModal}>
          Say your thoughts...
        </p>
        <AddPostModal />
      </div>

      <hr />

      <label className='py-2 bg-gray-100 text-gray-500 flex gap-2 justify-center items-center text-sm md:text-base cursor-pointer hover:underline'
            onClick={showPostModal}
            htmlFor='uploadPhoto'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
        </svg>
        <p>
          Photo / Video
        </p>
      </label>


    </section>
  )
}

export default AddPost