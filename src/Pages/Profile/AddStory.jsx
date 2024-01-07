import React from 'react'

function AddStory() {
  return (
    <div className='shadow-xl p-2 text-white bg-[#2351A7] rounded-full cursor-pointer
                    hover:scale-110 duration-150'
          title='Add Story'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    </div>
  )
}

export default AddStory