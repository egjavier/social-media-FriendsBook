import React, { useEffect } from 'react'

function NotificationsPage() {

  useEffect(() => {
    localStorage.removeItem('profilepagePosts')
    localStorage.removeItem('profileGallery')
  }, [])

  return (
    <div>NotificationsPage</div>
  )
}

export default NotificationsPage