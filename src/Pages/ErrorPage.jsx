import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/pages/Page.css'

const ErrorPage = () => {
  return (
    <section className="page-main">
      <div className="page-card">
        <h1>404</h1>
        <p>Page not found.</p>
        <p>
          <Link to="/Home">Go back to Home</Link>
        </p>
      </div>
    </section>
  )
}

export default ErrorPage
