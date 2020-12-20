import React from 'react'

const Country = ({country}) => {
    return (
        <div>
          <h1>{country.name}</h1>
          <p>capital {country.capital} <br />
            population {country.population}</p>
          <h2>languages</h2>
          <ul>
            {country.languages.map(language => <li key={language["iso639_1"]}>{language.name}</li>)}
          </ul>
          <img src={country.flag} alt={country.name + " flag"} height="100px" />
        </div>
    )
}

export default Country
