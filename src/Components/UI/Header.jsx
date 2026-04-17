import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import '../../styles/components/Header.css'
import { GiHamburgerMenu } from 'react-icons/gi'

const Header = () => {
   const[show,setShow]=useState(false)
  const handleButtonToggle=()=>{
    setShow((prev) => !prev);
  }
  return (
    <header className="app-header">
      <NavLink className="brand-link" to="/">
        <h2 className="brand-title">GeoScope</h2>
      </NavLink>

      <nav id="primary-menu" className={`menu ${show ? "active" : ""}`}>
        <ul className="nav-list" onClick={() => setShow(false)}>
          <li>
            <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/Home">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/Country">
              Country
            </NavLink>
          </li>
          <li>
            <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/About">
              About
            </NavLink>
          </li>
          <li>
            <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/Contact">
              Contact
            </NavLink>
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
