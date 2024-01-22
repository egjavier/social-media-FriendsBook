import React, { useContext, useEffect, useState } from 'react'
import Context from '../../../Context/Context'
import { collection, getDocs, query, orderBy } from "firebase/firestore"
import db from '../../../Config/FirebaseConfig'
import { useNavigate } from 'react-router-dom'

function 
ListOfUsers() {

  const [ searchFilter, setSearchFilter ] =  useState("")
  const [ searchedUser, setSearchedUser ] = useState([])
  const navigate = useNavigate()

  // CONTEXT
  const {
          allUsers,
          galleryArray,
          setProfileGallery,
        } = useContext(Context)

  // SEARCH LOGIC
  const handleSearch = () => {
    const array = []
    allUsers.filter((user) => {
      if(
        user.firstname.toLowerCase().includes(searchFilter) ||
        user.lastname.toLowerCase().includes(searchFilter) ||
        user.displayName.toLowerCase().includes(searchFilter) ||
        user.email.toLowerCase().includes(searchFilter)
      ) {
        array.push(user)
        setSearchedUser(array)
      }
    })
  }

  // FETCH GALLERY
  const fetchGallery = async (userID) => {

    const arr = []
    const r = query(collection(db, "gallery"), orderBy("timestamp", "desc"))
    const qs = await getDocs(r);
    const e = qs.docs.map( f => ({...f.data(), id: f.id}))
    e.forEach(image => {
      image.userId === userID && arr.push(image)
      localStorage.setItem("profileGallery", JSON.stringify(arr))
      setProfileGallery(arr)
    })

    navigate(`/${userID}`) 

    location.reload()
  }

  return (
    <div className='hidden md:col-span-4 lg:col-span-3 rounded-md gap-3 bg-white
                    md:flex md:flex-col md:justify-between md:items-center mt-5'>
                      
      {/* SEARCH BAR */}
      <div className='my-5 px-10 flex'>
        <input  type="search" 
                name="search"
                placeholder="Search"
                value={searchFilter}
                onChange={e => {
                  setSearchFilter(e.target.value.toLowerCase())
                  handleSearch()
                }}
                className="rounded-md rounded-e-none px-3 placeholder:italic w-full
                            outline-none border border-e-none
                          text-gray-500 text-md md:text-sm"
        />
        <button className='btn rounded-s-none bg-[#2351A7]/90 text-white'
                onClick={handleSearch}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </button>
      </div>

      <div className='w-full px-10'>
            {
              searchFilter !== "" 
                ?  searchedUser.map(user => {
                    return(
                      <div className='my-2 flex justify-start items-center gap-5'
                            key={user.userId}>
                        {/* image */}
                        <img src={user.profilePhoto}
                                alt ={user.displayName}
                                className='w-12 h-12 object-cover rounded-full'
                        />
                        {/* name */}
                        <p className='font-semibold hover:underline hover:scale-105 duration-150 cursor-pointer'
                            onClick={() => { 
                              fetchGallery(user.userId)
                            }}>
                          {user.firstname} {user.lastname}
                        </p>
                      </div>
                    )
                   })
                : allUsers.map(user => {
                  return(
                    <div className='my-2 flex justify-start items-center gap-5'
                          key={user.userId}>
                      {/* image */}
                      <img src={user.profilePhoto}
                              alt ={user.displayName}
                              className='w-12 h-12 object-cover rounded-full'
                      />
                      {/* name */}
                      <p className='font-semibold hover:underline hover:scale-105 duration-150 cursor-pointer'
                          onClick={() => { 
                            fetchGallery(user.userId)
                          }}>
                        {user.firstname} {user.lastname}
                      </p>
                    </div>
                  )
                 })
            }
          </div>

    </div>
  )
}

export default ListOfUsers