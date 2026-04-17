import React from 'react'
import '../../styles/components/SearchFilter.css'

const SearchFilter = ({
  search, 
  setSearch, 
  filter, 
  setFilter, 
  suggestions,
  setSortOrder
}) => {
    const handleInputChange=(e)=>{
     setSearch(e.target.value)
    }
    const handleSelectChange=(e)=>{
        setFilter(e.target.value)
       }

 return (
   <section className="search-filter">
    <div className="search-input-wrap">
      <input className="search-input" type="text" placeholder='Search' value={search} onChange={handleInputChange}/>
      
      {suggestions.length > 0 && (
  <ul className="suggestion-list">
    {suggestions.map((country) => (
      <li
        key={country.cca3}
        onClick={() => setSearch(country.name.common)}
        className="suggestion-item"
      >
        {country.name.common}
      </li>
    ))}
  </ul>
)}

    </div>
    <div className="search-actions">
        <div><button className="sort-btn" onClick={()=>setSortOrder("asc")}>ASC</button></div>
        <div><button className="sort-btn" onClick={()=>setSortOrder("desc")}>DESC</button></div>
        <select className="region-select" value={filter} onChange={handleSelectChange}>
            <option value="All">All</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
        </select>
    </div>
   </section>
  )
}

export default SearchFilter
