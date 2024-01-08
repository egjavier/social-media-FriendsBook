import React from 'react'
import Thumbnail from './Thumbnail'
import ProfileImage from './ProfileImage'
import AddStory from './AddStory'
import EditProfile from './EditProfile'
import ProfileName from './ProfileName'
import AddStoryMobile from './AddStoryMobile'
import EditProfileMobile from './EditProfileMobile'
import AddPost from '../../Components/AddPostFolder/AddPost'
import MyPosts from './MyPosts'

function ProfilePage() {

  return (
    <section className='profile max-w-[1200px] mx-auto bg-[#f7f7f7] flex flex-col gap-5 mb-5'>
      <div className='relative'>
        <Thumbnail />
        <div className='absolute w-full px-10 bottom-[-95px] text-center flex
                        justify-center md:justify-between md:items-center'>
          <ProfileImage />
          <div className='hidden md:flex gap-3'>
            <AddStory />
            <EditProfile />
          </div>
        </div>
      </div>

      <div className='pt-4 md:pt-0 pb-3 shadow-lg'>
        <div className='mt-12 py-3
                        md:text-start md:grid md:grid-cols-11 md:mt-0'>
          <ProfileName />
        </div>

        <div className='md:hidden flex justify-center gap-5'>
          <AddStoryMobile />
          <EditProfileMobile />
        </div>
      </div>

      <div className=' md:px-1 md:grid md:grid-cols-12 md:gap-2 h-screen overflow-y-scroll'>
        <div className='hidden md:block bg-pink-300 col-span-3'>left</div>
        <div className='md:col-span-6'>
          <AddPost />
          <MyPosts />
        </div>
        <div className='hidden md:block bg-pink-300 col-span-3'>chat</div>
      </div>
    </section>
  )
}

export default ProfilePage