import React from 'react'
import AddPost from '../../Components/AddPostFolder/AddPost'
import Feed from './Feed'
import LeftSection from './Left/LeftSection'

function HomePage() {

  return (
    <section className='profile max-w-[1200px] mx-auto bg-[#f7f7f7] flex flex-col gap-5 my-5'>
      <div className=' md:px-1 md:grid md:grid-cols-12 md:gap-2'>

        <div className='hidden md:block col-span-3'>
          <LeftSection />
        </div>

        <div className='md:col-span-6 h-screen overflow-scroll'>
          <AddPost />
          <div className='pt-3'>
            <Feed />
          </div>
        </div>

        <div className='bg-blue-100 hidden md:block col-span-3'>
          chat
        </div>

      </div>  
    </section>
  )
}

export default HomePage