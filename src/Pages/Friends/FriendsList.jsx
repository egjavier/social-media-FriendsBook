import React, { useEffect } from 'react'

function FriendsList() {

  useEffect(() => {
    localStorage.removeItem('profilepagePosts')
    localStorage.removeItem('profileGallery')
  }, [])
  
  return (
    <div>FriendsList</div>
  )
}

export default FriendsList