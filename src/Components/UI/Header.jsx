'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import '../../styles/components/Header.css'
import { GiHamburgerMenu } from 'react-icons/gi'

const Header = () => {
   const[show,setShow]=useState(false)
   const pathname = usePathname()

  const getLinkClass = (href) => {
    if (href === '/home' && (pathname === '/' || pathname === '/home')) {
      return 'nav-link active'
    }

    return pathname === href ? 'nav-link active' : 'nav-link'
  }

  const handleButtonToggle=()=>{
    setShow((prev) => !prev);
  }
  return (
    <header className="app-header">
      <Link className="brand-link" href="/">
        <h2 className="brand-title">GeoScope</h2>
      </Link>

      <nav id="primary-menu" className={`menu ${show ? "active" : ""}`}>
        <ul className="nav-list" onClick={() => setShow(false)}>
          <li>
            <Link className={getLinkClass('/home')} href="/home">
              Home
            </Link>
          </li>
          <li>
            <Link className={getLinkClass('/country')} href="/country">
              Country
            </Link>
          </li>
          <li>
            <Link className={getLinkClass('/about')} href="/about">
              About
            </Link>
          </li>
          <li>
            <Link className={getLinkClass('/contact')} href="/contact">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
      <div className="menu-toggle-wrap">
        <button
          type="button"
          className="menu-toggle-btn"
          onClick={handleButtonToggle}
          aria-expanded={show}
          aria-controls="primary-menu"
          aria-label="Toggle navigation menu"
        >
          <GiHamburgerMenu />
        </button>
      </div>
      {show && (
        <button
          type="button"
          className="menu-backdrop"
          onClick={() => setShow(false)}
          aria-label="Close menu"
        />
      )}
    </header>
  )
}

export default Header
