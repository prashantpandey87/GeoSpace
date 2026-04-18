import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import Loading from '../UI/Loading'
import { getCountryByName } from '../../Api/Client'
import '../../styles/layout/CountryDetails.css'


const CountryDetails = () => {
    const params = useParams()

    const [country, SetCountry] = useState(null)
    const [loading, SetLoading] = useState(true)
    const [error,setError]=useState("")



    useEffect(() => {
       let isMounted=true
       const fetchCountryByName = async () => {
        try {
            const res = await getCountryByName(params.id)
            if(isMounted)
            { SetCountry(res.data[0])}
        } catch (error) {
            if(isMounted)
            { setError("Failed to load country details.");}
        }
        finally {
            if(isMounted)
            { SetLoading(false)} 
        }
    }
    fetchCountryByName()
   return ()=>{
    isMounted=false
   }

    }, [params.id])

    if (loading) return <Loading />
    if (error) return <p>{error}</p>;
    if (!country) return <p>No country found.</p>;


     

    return (
        <section className="country-details-shell">
            
            <div className="country-details">
                <div className="country-details-image-wrap">
                    <img className="country-details-image" src={country.flags.svg} alt={`${country.name.official} flag`} />
                </div>
                <div className="country-details-content">
                    <p className="country-details-title">{country.name.official}</p>

                    <p className="country-details-meta">Native Names:- <span>{Object.keys(country.name.nativeName).map((key) => country.name.nativeName[key].common).join(", ")}</span></p>
                    <p className="country-details-meta">Population:- <span>{country.population.toLocaleString()}</span></p>
                    <p className="country-details-meta">Region:- <span>{country.region}</span></p>
                    <p className="country-details-meta">SubRegion:- <span>{country.subregion}</span></p>
                    <p className="country-details-meta">Capital: <span>{country.capital?.join(", ") || "N/A"}</span></p>
                    <p className="country-details-meta">Top Level Domain: <span>{country.tld?.[0] || "N/A"}</span></p>
                    <p className="country-details-meta">Currencies:- <span>{Object.keys(country.currencies).map((currency) => country.currencies[currency].name).join(", ")}</span></p>
                    <p className="country-details-meta">Language:- <span>{Object.keys(country.languages).map((lang) => country.languages[lang]).join(", ")}</span></p>
                </div>
                <NavLink className="country-back-link" to="/Country">
                    <button className="country-back-btn">Go Back</button>
                </NavLink>

            </div>
        </section>
    )
}

export default CountryDetails
