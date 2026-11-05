import React from 'react'
import { Link } from "react-router-dom";
import navbarLogo from "../../data/navbar/Logo"

const Logo = () => {

  const { logo } = navbarLogo;

  return (
    <Link
      to="/"
      aria-label="Go to HomePage"
      className="flex items-center gap-3 shrink-0"
    >

      <img
        src="/images/logo/NavbarLogo.png"
        alt={logo.alt}
        className="h-30 w-auto object-contain"
      />

      {
        logo?.showName && (
          <span
            className='text-lg font-semibold tracking-wide text-white'>
            {logo.name}
          </span>
        )
      }
    </Link>
  )
}

export default Logo