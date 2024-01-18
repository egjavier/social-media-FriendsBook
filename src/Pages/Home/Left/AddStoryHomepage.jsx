import React from 'react'

function AddStoryHomepage() {
  return (
    <div className='bg-white w-full rounded-xl grid grid-cols-2 overflow-hidden p-5'>
      <button className='btn btn-sm col-span-1 rounded-s-xl rounded-e-none border-e border-[#2351A7]
                         bg-white text-[#2351A7] font-bold tracking-wide text-xs lg:text-sm
                         hover:bg-[#2351A7] hover:text-white'
              onClick={() => {document.getElementById('addStoryModal').showModal()}}>
        Add Story
      </button>
      <button className='btn btn-sm col-span-1 rounded-e-xl rounded-s-none border-e border-[#2351A7]
                         bg-white text-[#2351A7] font-bold tracking-wide text-xs lg:text-sm
                         hover:bg-[#2351A7] hover:text-white'
              onClick={() => {document.getElementById('search').showModal()}}>
        Search
      </button>
    </div>
  )
}

export default AddStoryHomepage