import React from 'react'
import Country from './Country'

const Countries = (props) => {

    const showCountries = props.filter ? props.countries.filter((country) => country.name.toLowerCase().includes(props.filter.toLowerCase())) : []

    if (showCountries.length === 1) {
        const country = showCountries[0];
        return ( <Country country={country} /> )
    }

    if (showCountries.length > 10) {
        return (<p>Too many matches, specify another filter</p>)
    }

    return (
        <div>
          {showCountries.map((country) => <p key={country.name}>{country.name}</p>)}
        </div>
    );
}

export default Countries
