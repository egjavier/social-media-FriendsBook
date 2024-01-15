import React, { useContext, useEffect, useState } from 'react'
import Context from '../../../Context/Context'
import StoryModal from './StoryModal'
import StoriesSkeleton from './StoriesSkeleton'

function StoriesSection() {

  const [ storyInfo, setStoryInfo ] = useState({})
  const [ isLoading, setIsLoading ] = useState(true)

  // CONTEXT
  const {
          storiesArray,
          userInfo
        } = useContext(Context)

  // SKELETON
  useEffect(() =>{
    setTimeout(() =>{
      setIsLoading(false)
    }, 3000)
  }, []) 
        
  return (
    <section className='stories px-5 pb-6 mt-6 carousel carousel-center overflow-y-hidden
                        flex gap-3 overflow-scroll'>
      {
        isLoading 
          ? <StoriesSkeleton />
          : storiesArray.map(e => {
              return(
                <div className='relative carousel-item rounded-full shadow-xl
                                flex justify-center'
                      key={e.storyUrl}>
                  <img  src={e.storyUrl}
                        alt="Story for today" 
                        className=' h-28 w-28 rounded-full object-cover cursor-pointer'
                        onClick={() => {
                          document.getElementById('storyModal').showModal()
                          setStoryInfo(e)
                        }}
                  />
                  <div className='absolute bottom-[-20px]'>
                    <img  src={e.profilePhoto} 
                          alt={e.displayName}
                          className='w-10 h-10 rounded-full object-cover border-2 border-white'
                    />
                  </div>
                  <StoryModal storyInfo={storyInfo} />
                </div>
              )
            })
      }

    </section>
  )
}

export default StoriesSection