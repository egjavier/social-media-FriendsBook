import React from 'react'
import GalleryPreview from './GalleryPreview'

function RightSection() {
  return (
    <div className='hidden md:col-span-4 lg:col-span-3 rounded-md gap-3 h-screen overflow-y-scroll
                    md:flex md:flex-col md:justify-between md:items-center'>
      <GalleryPreview />
    </div>
  )
}

export default RightSection