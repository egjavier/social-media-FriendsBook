import React, { useContext, useState } from 'react'
import Context from '../../../Context/Context'
import { useNavigate } from 'react-router-dom'


function SearchModal() {

  const [ searchFilter, setSearchFilter ] =  useState("")
  const [ searchedUser, setSearchedUser ] = useState([])
  const navigate = useNavigate()

  // CONTEXT
  const {
          allUsers
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

  const emptyFields = () => {
    setSearchFilter("")
    setSearchedUser([])
  }
  return (
    <div>
      <dialog id="search" className="modal modal-middle">
        <div className="modal-box">

          {/* TITLE */}
          <div className='flex justify-between mb-3'>
              <p className='font-semibold'>
                Search User
              </p>
              <div className='modal-action mt-0'>
                <form method='dialog'>
                  <button className=' font-black cursor-pointer hover:scale-110 duration-300
                                    w-8 h-8 rounded-full hover:shadow-lg'
                          onClick={emptyFields}>
                      X
                  </button>
                </form>
              </div>
            </div>

          <hr/>
          
          {/* SEARCH BAR */}
          <div className='mt-5 px-10 flex'>
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
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </button>
          </div>

          <div className='mt-5 px-10'>
            {
              searchFilter !== "" &&
              searchedUser.map(user => {
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
                        onClick={() => { navigate(`/${user.userId}`) }}>
                      {user.firstname} {user.lastname}
                    </p>
                  </div>
                )
              })
            }
          </div>

        </div>
      </dialog>
    </div>
  )
}

export default SearchModal