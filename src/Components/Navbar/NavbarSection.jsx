import React from 'react'
import Logo from './Logo'
import NavbarMenu from './NavbarMenu'
import NavbarProfile from './NavbarProfile'

function NavbarSection() {
  return (
    <nav className='h-12 border-b shadow-lg sticky top-0 bg-white z-20'>
      <div className='max-w-[1200px] mx-auto h-full px-5 flex items-center justify-between'>
        <Logo />
        <NavbarMenu />
        <NavbarProfile />
      </div>
    </nav>
  )
}

export default NavbarSection