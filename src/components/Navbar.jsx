import React from 'react'

// Navbar Components
import Logo from "./navbar/Logo";
import Title from "./navbar/Title";
import NavLinks from './navbar/NavLinks';

const Navbar = () => {
  return (
    <nav className="w-full px-5 py-4 sm:px-8 lg:px-12">
      <div className="flex w-full items-center gap-4">

        {/* Navbar Logo */}
        <Logo />

        {/* Navbar Title */}
        <div className="ml-3 shrink-0">
          <Title />
        </div>

        {/* Navigation Links */}
        <div className="ml-16 shrink-0">
          <NavLinks />
        </div>

      </div>
    </nav>
  )
}

export default Navbar