import React from 'react'

function SearchSmall() {
  return (
    <div className='md:hidden absolute top-[79vh] right-5 z-[20] bg-white rounded-full cursor-pointer'>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2351A7" 
            className="w-14 h-14 hover:scale-110 duration-300">
        <path d="M8.25 10.875a2.625 2.625 0 1 1 5.25 0 2.625 2.625 0 0 1-5.25 0Z" />
        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.125 4.5a4.125 4.125 0 1 0 2.338 7.524l2.007 2.006a.75.75 0 1 0 1.06-1.06l-2.006-2.007a4.125 4.125 0 0 0-3.399-6.463Z" clipRule="evenodd" />
      </svg>
    </div>
  )
}

export default SearchSmall