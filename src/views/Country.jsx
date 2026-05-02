'use client'

import { useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import '../styles/pages/Country.css'
import { getCountries } from '../Api/Client'
import Loading from '../Components/UI/Loading'
import CountryCard from '../Components/Layout/CountryCard'
import SearchFilter from '../Components/UI/SearchFilter'

const Country = () => {

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

  const {
    data: countries = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['countries'],
    queryFn: async () => {
      const res = await getCountries()
      return res.data
    },
  })

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

const suggestions=useMemo(()=>{
  const q = debouncedSearch.toLowerCase().trim()
  if (!q) return []; 
  return filterCountries.filter((country)=>{
    const name=country.name.common.toLowerCase()
    return name.includes(q) && name!==q
  }).slice(0,5)
},[debouncedSearch,filterCountries])

const isSearching = debouncedSearch.trim() !== ""
  const totalPages = Math.ceil(filterCountries.length / itemPerPage)
  const pages = [...Array(totalPages).keys()].map((i) => i + 1)
  const startIndex = (currentPage - 1) * itemPerPage
  const endIndex = startIndex + itemPerPage
  const paginatedCountries = filterCountries.slice(startIndex, endIndex)
  const displayCountries = isSearching ? filterCountries : paginatedCountries

  if (isLoading) return <Loading />
  if (isError) return <p className="country-error">Failed to load countries.</p>;

  return (
    <section className="country-page">
      <SearchFilter
        search={search} 
        setSearch={(value) => {
          setSearch(value)
          setCurrentPage(1)
        }}
        filter={filter} 
        setFilter={(value) => {
          setFilter(value)
          setCurrentPage(1)
        }}
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
