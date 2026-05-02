import '../../styles/pages/Country.css'
import Link from 'next/link'

const CountryCard = ({country}) => {
    const{flags,name,population,region,capital}=country
  return (
    <li className="country-card">
        <div className="country-flag-wrap">
            <img className="country-flag" src={flags.svg} alt={`${name.common} flag`} />
        </div>
        <div className="country-info">
            <p className="country-name">{name.common}</p>
            <p className="country-meta">
               <span>Population:</span> {population.toLocaleString()}
            </p>
            <p className="country-meta">
            <span>Region:</span> {region}
            </p>
            <p className="country-meta">
            <span>Capital:</span> {capital?.[0] || 'N/A'}
            </p>
            <Link className="country-btn" href={`/country/${name.common}`}>
              Read More
            </Link>
            
        </div>
    </li>
  )
}

export default CountryCard
