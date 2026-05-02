'use client'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import Loading from '../UI/Loading'
import { getCountryByName } from '../../Api/Client'
import '../../styles/layout/CountryDetails.css'


const CountryDetails = () => {
    const params = useParams()
    const countryId = decodeURIComponent(params.id)

    const { data: country, isLoading, isError } = useQuery({
        queryKey: ['country', countryId],
        queryFn: async () => {
            const res = await getCountryByName(countryId)
            return res.data?.[0] ?? null
        },
        enabled: Boolean(countryId),
    })
    if (isLoading) return <Loading />
    if (isError) return <p>Failed to load country details.</p>;
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
                <Link className="country-back-link" href="/country">
                    <button className="country-back-btn">Go Back</button>
                </Link>

            </div>
        </section>
    )
}

export default CountryDetails
