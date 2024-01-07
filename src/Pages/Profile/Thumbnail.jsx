import React from 'react'
import thumbnailPlaceholder from '../../Images/profileThumbnail.jpg'

function Thumbnail() {

  return (
    <div className=''>
      <img  src={thumbnailPlaceholder}
            alt="" 
            className='max-h-[400px] w-full object-cover'
      />
    </div>
  )
}

export default Thumbnail