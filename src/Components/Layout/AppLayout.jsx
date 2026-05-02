import Header from '../UI/Header'
import Footer from '../UI/Footer'

const AppLayout = ({ children }) => {
  return (
    <div className="app-shell">
        <Header/>
        <main className="app-content">
          {children}
        </main>
        <Footer/>
    </div>
  )
}

export default AppLayout
