import React from 'react'

function OpenImageModal({image}) {

  return (
    <dialog id="openImage" className="modal">
      <div className="modal-box">
        {/* IMAGE */}
          <img  src={image.postImage}
                  alt={image.postText}
                  className=''
          />
          <p className='text-start font-semibold mt-3'>
            {image.postText}
          </p>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
          </form>
        </div>
      </div> 
    </dialog>
  )
}

export default OpenImageModal

