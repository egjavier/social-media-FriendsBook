import React, { useContext, useEffect, useState } from 'react'
import { doc, setDoc, getDoc, } from "firebase/firestore"
import db from '../../Config/FirebaseConfig'
import Context from '../../Context/Context'

function Hearts({postInfo}) {

  // CONTEXT
  const {
          userInfo, 
          hearts   
        } = useContext(Context)

  const [ isHeart, setIsHeart ] = useState(false)
  const [ fill, setFill ] = useState(false)
  const [ heartCount, setHeartCount ] = useState(0)
  const [ isAdded, setIsAdded ] = useState(false)
  const [ newHeart, setNewHeart ] = useState(false)
  const [ byWho, setByWho ] = useState("")

  // CHANGE STATE
  const handleHeart = () => {
    setIsHeart(!isHeart)
    setNewHeart(true)
  }
    
  // ADD COUNT 
  const addCount = () => {
    if (isHeart === true ) {
      setHeartCount(heartCount + 1)
    } else if (isHeart === false && heartCount > 0) {
      setHeartCount(heartCount - 1)
    }

    // console.log("postInfo.id", postInfo.id)
    hearts.map(e => {
      e.id === postInfo.id && setFill(true)
    })
  }

  // ADD HEARTS TO COLLECTION
  const addData =  async () => {
    try{

      // add data
      postInfo.id !== undefined &&
        await setDoc(doc(db, "hearts", postInfo.id), {
          heartCount: heartCount,
          byWho: userInfo.displayName
        })
        setIsAdded(true)
    } catch(e){
      console.error(e)
    }
  }

  useEffect(() => {
    addData()
    setNewHeart(false)
  }, [newHeart])
 
  useEffect(() => {
    addCount()
  }, [isHeart])

  return (
    <button className={
                        isHeart === false && fill === false
                          ? 'btn btn-ghost btn-sm w-full rounded-none hover:bg-gray-100'
                          : 'btn btn-ghost btn-sm w-full rounded-none text-red-500 hover:bg-gray-100'
                      }
            onClick={handleHeart}>
      {
        isHeart === false
          ? <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
          : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
            </svg>
      }

      {heartCount > 0 && heartCount} Heart
    </button>
  )
}

export default Hearts