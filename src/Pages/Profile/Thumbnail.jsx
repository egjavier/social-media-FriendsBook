import React, { useContext, useEffect, useState } from 'react'
import ThumbnailModal from './ThumbnailModal'
import Context from '../../Context/Context'
import { useParams } from 'react-router-dom'

function Thumbnail() {

  const [ user, setUser ] = useState("")
  const { id } = useParams()

  // CONTEXT
  const { 
          allUsers, 
        } = useContext(Context)

  // GET USER
  const getUser = () => {
    allUsers.map(u => {
      if(u.userId === id) {
        setUser(u)
      }
    })
  }

  useEffect(() =>{
    getUser()
  }, [])

  return (
    <div className='bg-gray-300 h-[400px] w-full flex justify-center items-center cursor-pointer'
          onClick={() => {
            document.getElementById('thumbnailModal').showModal()
          }}>

      {
        user.thumbnail !== ""
        ? <img  src={user.thumbnail} 
                alt="Thumbnail" 
                className='w-full h-full object-cover'/>
        :  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-20 h-20 text-gray-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
      }

      <ThumbnailModal />
    </div>
  )
}

export default Thumbnail