import React from 'react'

function AddStoryMobile() {
  return (
    <div className='flex justify-center items-center gap-2 shadow-xl py-2 px-4 text-white bg-[#2351A7] rounded-full cursor-pointer
                    hover:scale-105 duration-150'>
      <span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </span>
      <p className='font-semibold'>
        Add Story
      </p>
    </div>
  )
}

export default AddStoryMobile