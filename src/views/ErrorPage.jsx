import Link from 'next/link'
import '../styles/pages/Page.css'

const ErrorPage = () => {
  return (
    <section className="page-main">
      <div className="page-card">
        <h1>404</h1>
        <p>Page not found.</p>
        <p>
          <Link href="/home">Go back to Home</Link>
        </p>
      </div>
    </section>
  )
}

export default ErrorPage
