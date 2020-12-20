import React from 'react'
import Weather from './Weather'

const Country = ({country}) => {
    return (
        <div>
          <h1>{country.name}</h1>
          <p>capital {country.capital} <br />
            population {country.population}</p>
          <h2>Spoken languages</h2>
          <ul>
            {country.languages.map(language => <li key={language["iso639_1"]}>{language.name}</li>)}
          </ul>
          <img src={country.flag} alt={country.name + " flag"} height="100px" />
        <Weather city={country.capital} country={country.alpha2Code}/>
        </div>
    )
}

export default Country
