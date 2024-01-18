import React, { useEffect } from 'react'

function InboxPage() {

  useEffect(() => {
    localStorage.removeItem('profilepagePosts')
    localStorage.removeItem('profileGallery')
  }, [])
  return (
    <div>InboxPage</div>
  )
}

export default InboxPage