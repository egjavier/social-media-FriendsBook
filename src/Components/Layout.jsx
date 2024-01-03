import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Pages/Footer'

function Layout() {
  return (
    <>
      <Outlet/>
      <Footer />
    </>
  )
}

export default Layout