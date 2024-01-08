import React from 'react'
import ProfilePreview from './ProfilePreview'

function LeftSection() {
  return (
    <div className='hidden md:col-span-4 lg:col-span-3 rounded-md gap-3 h-screen overflow-y-scroll
                    md:flex md:flex-col md:justify-between md:items-center'>
      <ProfilePreview />
    </div>
  )
}

export default LeftSection