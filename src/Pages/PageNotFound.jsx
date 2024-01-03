import React from 'react'
import Footer from './Footer'
import { useNavigate } from 'react-router-dom'
import HomeIcon from '@heroicons/react/24/solid/HomeIcon'

function PageNotFound() {

  const navigate = useNavigate()

  return (
    <section className='flex flex-col justify-between bg-[#AACEFE]/50'>
      <div className='flex flex-col justify-center items-center h-screen gap-4 border shadow'>
        <div className='text-center text-[#2351A7]'>
          <p className='text-4xl md:text-6xl font-black tracking-widest'>
            404
          </p>
          <p className='text-sm md:text-md italic'>
            Page Not Found
          </p>
        </div>

        <button className='bg-[#2351A7] py-1 px-3 rounded-md text-xs hover:shadow-md
                        hover:translate-y-0.5 duration-200 flex gap-2 items-center
                        text-white'
                onClick={() => {
                  navigate('/');
                }}>
          <HomeIcon width={20} />
          <span className='font-light'>|</span> Go Back
        </button>  

      </div>
      <Footer />
    </section>
  )
}

export default PageNotFound