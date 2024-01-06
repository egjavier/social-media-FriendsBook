import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./Components/Layout"
import LoginPage from "./Pages/Login/LoginPage"
import PageNotFound from "./Pages/PageNotFound"
import HomePage from "./Pages/Home/HomePage"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from './Config/FirebaseConfig'
import { useContext, useEffect } from "react"
import Context from "./Context/Context"
import ProfilePage from "./Pages/Profile/ProfilePage"
import InboxPage from "./Pages/Inbox/InboxPage"
import NotificationsPage from "./Pages/Notifications/NotificationsPage"
import FriendsList from "./Pages/Friends/FriendsList"
import Gallery from "./Pages/Gallery/GalleryPage"


function App() {

  // CONTEXT
  const { isLoggedIn, setIsLoggedIn } = useContext(Context)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User is signed in.')
        setIsLoggedIn(true)
      } else {
        console.log('User is NOT signed in.')
      }
    })
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={isLoggedIn ? <HomePage /> : <LoginPage />} />
          <Route path="login" element={isLoggedIn ? <HomePage /> : <LoginPage />} />
          <Route path="home" element={isLoggedIn ? <HomePage /> : <LoginPage />}/>
          <Route path=":id" element={isLoggedIn ? <ProfilePage /> : <LoginPage />}/>
          <Route path="inbox" element={isLoggedIn ? <InboxPage /> : <LoginPage />}/>
          <Route path="notifications" element={isLoggedIn ? <NotificationsPage /> : <LoginPage />}/>
          <Route path="friends" element={isLoggedIn ? <FriendsList /> : <LoginPage />}/>
          <Route path="gallery" element={isLoggedIn ? <Gallery /> : <LoginPage />}/>
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    
    </BrowserRouter>
  )
}

export default App
