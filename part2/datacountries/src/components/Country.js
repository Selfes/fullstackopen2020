import React from 'react'
import Weather from './Weather'

const Country = ({country}) => {
    return (
        <div>
          <h1>{country.name.common}</h1>
          <p>capital {country.capital} <br />
            population {country.population}</p>
          <h2>Spoken languages</h2>
          <ul>
            {Object.keys(country.languages).map(langcode => <li key={langcode}>{country.languages[langcode]}</li>)}
          </ul>
          <img src={country.flags.png} alt={country.name.common + " flag"} height="100px" />
        <Weather city={country.capital} country={country.cca2}/>
        </div>
    )
}

export default Country
