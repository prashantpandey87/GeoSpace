import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global/index.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import AppLayout from './Components/Layout/AppLayout.jsx'
import Country from './Pages/Country.jsx'
import About from './Pages/About.jsx'
import Contact from './Pages/Contact.jsx'
import ErrorPage from './Pages/ErrorPage.jsx'
import CountryDetails from './Components/Layout/CountryDetails.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
   <Route path='/' element={<AppLayout/>}>
   <Route index element={<Navigate to="/Home" />}/>
   <Route path="/Home" element={<Home/>}/>
   <Route path="/Country" element={<Country/>}/>
   <Route path="/About" element={<About/>}/>
   <Route path="/Contact" element={<Contact/>}/>
   <Route path="/country/:id" element={<CountryDetails/>}/>
   </Route>
   <Route path="*" element={<ErrorPage/>}/>

    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
