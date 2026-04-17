import React from 'react'
import Header from '../UI/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../UI/Footer'

const AppLayout = () => {
  return (
    <div className="app-shell">
        <Header/>
        <main className="app-content">
          <Outlet/>
        </main>
        <Footer/>
    </div>
  )
}

export default AppLayout
