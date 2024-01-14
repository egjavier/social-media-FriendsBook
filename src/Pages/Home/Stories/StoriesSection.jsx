import React, { useContext } from 'react'
import Context from '../../../Context/Context'

function StoriesSection() {

  // CONTEXT
  const {
          storiesArray,
          userInfo
        } = useContext(Context)

  return (
    <section className='stories px-5 pb-6 mt-6 carousel carousel-center overflow-y-hidden
                        flex gap-3 overflow-scroll'>
      {
        storiesArray.map(e => {
          return(
            <div className='relative carousel-item rounded-full shadow-xl
                            flex justify-center'>
              <img  src={e.storyUrl}
                    alt="Story for today" 
                    className=' h-28 w-28 rounded-full object-cover'
              />
              <div className='absolute bottom-[-20px]'>
                <img  src={userInfo.profilePhoto} 
                      alt={userInfo.displayName}
                      className='w-10 h-10 rounded-full object-cover border-2 border-white'
                />
              </div>
            </div>
          )
        })
      }
    </section>
  )
}

export default StoriesSection