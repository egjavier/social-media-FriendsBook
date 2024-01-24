import React from 'react'

function AddStorySmall() {
  return (
    <div className='lg:hidden absolute top-[90vh] right-5 z-[20] bg-white rounded-full cursor-pointer'
        onClick={() => {document.getElementById('addStoryModal').showModal()}}>
      <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2351A7" 
            className="w-14 h-14 hover:scale-110 duration-300">
        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
      </svg>
    </div>
  )
}

export default AddStorySmall