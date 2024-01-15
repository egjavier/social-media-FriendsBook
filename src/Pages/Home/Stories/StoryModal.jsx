import React from 'react'

function StoryModal({storyInfo}) {

  return (
    <dialog id="storyModal" className="modal">
      {
        storyInfo.timestamp !== undefined &&
          <div className="modal-box">

            <div className='grid grid-cols-12 gap-2'>
              <img  src={storyInfo.profilePhoto}
                    alt={storyInfo.displayName} 
                    className='col-span-2 w-16 h-16 rounded-full object-cover'
              />
              <div className=' col-span-10 px-2 flex flex-col justify-center items-start'>
                <p className='font-semibold'>
                  {storyInfo.firstname} {storyInfo.lastname}
                </p>
                <p className='italic text-xs'>
                {new Date(storyInfo.timestamp.seconds * 1000 + storyInfo.timestamp.nanoseconds / 1000000).toString().slice(0, 21)}
                </p>
              </div>
            </div>

            <img  src={storyInfo.storyUrl}
                  alt="Today's Story"
                  className='mt-3'
            />

            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
      }
    </dialog>
  )
}

export default StoryModal