import React, { useEffect, useMemo, useState } from 'react'
import '../styles/pages/Country.css'
import { getCountries } from '../Api/Client'
import Loading from '../Components/UI/Loading'
import CountryCard from '../Components/Layout/CountryCard'
import SearchFilter from '../Components/UI/SearchFilter'


const Country = () => {

  const [countries, setCountries] = useState([])
  const [loading, SetLoading] = useState(true)
  const [error,setError]=useState("")
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("All")
  const [sortOrder, setSortOrder] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemPerPage = 12

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
    }, 400)
    return () => clearTimeout(timer)
  }, [search])

  useEffect(() => {

    let isMounted = true
    const fetchCountries = async () => {
      try {
        const res = await getCountries()
        if (isMounted) {
          setCountries(res.data)
        }
      } catch (error) {
        if(isMounted)
        {setError(error)}
      }
      finally {
        if (isMounted) {
          SetLoading(false)
        }
      }

    }
    fetchCountries()
    return () => {
      isMounted = false
    }

  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearch, filter])


  // here is the main logic and Sorted Logic
  const filterCountries = useMemo(() => {
    let result = countries.filter((country) => {
      const matchesSearch = debouncedSearch
        ? country.name.common.toLowerCase().includes(debouncedSearch.toLowerCase())
        : true;
  
      const matchesRegion =
        filter === "All" ? true : country.region === filter;
  
      return matchesSearch && matchesRegion;
    });
  
    if (sortOrder === "asc") {
      result.sort((a, b) => a.name.common.localeCompare(b.name.common));
    } 
    else if (sortOrder === "desc") {
      result.sort((a, b) => b.name.common.localeCompare(a.name.common));
    }
  
    return result;
  }, [countries, debouncedSearch, filter, sortOrder]);

  // Suggestion
  // const q = debouncedSearch.toLowerCase().trim()
  // const suggestions = debouncedSearch.trim()
  //   ? filterCountries
  //     .filter((country) => {
  //       const n = country.name.common.toLowerCase()

  //       return n.includes(q) && n !== q
  //     })
  //     .slice(0, 5)
  //   : []

const suggestions=useMemo(()=>{
  const q = debouncedSearch.toLowerCase().trim()
  if (!q) return []; 
  return filterCountries.filter((country)=>{
    const name=country.name.common.toLowerCase()
    return name.includes(q) && name!==q
  }).slice(0,5)
},[debouncedSearch,filterCountries])


//pagination

const isSearching = debouncedSearch.trim() !== ""
  const totalPages = Math.ceil(filterCountries.length / itemPerPage)
  const pages = [...Array(totalPages).keys()].map((i) => i + 1)
  const startIndex = (currentPage - 1) * itemPerPage
  const endIndex = startIndex + itemPerPage
  const paginatedCountries = filterCountries.slice(startIndex, endIndex)
  const displayCountries = isSearching ? filterCountries : paginatedCountries

 


  if (loading) return <Loading />
  if (error) return <p className="country-error">{error}</p>;

  return (
    <section className="country-page">
      <SearchFilter
        search={search} 
        setSearch={setSearch} 
        filter={filter} 
        setFilter={setFilter} 
        suggestions={suggestions} 
        setSortOrder={setSortOrder}/>
      <ul className="country-list">
        {displayCountries.map((currCountry) => {
          return (
            <CountryCard country={currCountry} key={currCountry.cca3} />)
        })}

      </ul>
      {!isSearching && totalPages > 1 && <div className='pagination'>
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage == 1}>Prev</button>
        {/* <span>
        Page {currentPage}of {totalPages}
      </span> */}

        {
          pages.map((page) => (
            <button onClick={() =>
              setCurrentPage(page)}
              key={page}
              className={currentPage === page ? "active-page" : ""}
            >{page}</button>
          ))
        }
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
      </div>}

    </section>
  )
}

export default Country
