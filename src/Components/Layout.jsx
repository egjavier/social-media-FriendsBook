import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Pages/Footer'
import Context from '../Context/Context'
import NavbarSection from './Navbar/NavbarSection'

function Layout() {

  // CONTEXT
  const { isLoggedIn } = useContext(Context)

  return (
    <>
      {
        isLoggedIn && <NavbarSection />
      }
      <Outlet/>
      {
        isLoggedIn && <Footer />
      }
    </>
  )
}

export default Layout