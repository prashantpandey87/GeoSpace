import axios from "axios";

const client=axios.create({
    baseURL:"https://restcountries.com/v3.1"
})

export const getCountries=()=>{
    return client.get("/all?fields=name,population,region,capital,flags")
    
} 

export const getCountryByName=(name)=>{
    return client.get(
        `/name/${name}?fullText=true&fields=name,population,region,subregion,capital,tld,currencies,languages,borders,flags`
      );
}