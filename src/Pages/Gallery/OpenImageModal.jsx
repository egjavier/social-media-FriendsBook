import React from 'react'

function OpenImageModal({image, post}) {

  return (
    <dialog id="openImage" className="modal">
      <div className="modal-box">
        {/* IMAGE */}
          <img  src={image}
                  alt={post}
                  className=''
          />
          <small>
            {post}
          </small>
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

