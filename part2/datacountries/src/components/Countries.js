import React from 'react'
import Country from './Country'

const Countries = (props) => {

    const showCountries = props.filter ? props.countries.filter((country) => country.name.common.toLowerCase().includes(props.filter.toLowerCase())) : []

    // inspired by https://www.w3schools.com/howto/howto_js_toggle_hide_show.asp
    const showCountry = (country) => {
      var showIt = document.getElementById("info-" + country);
      var button = document.getElementById("btn-" + country);
      if (showIt.style.display === "none") {
        showIt.style.display = "block";
        button.innerHTML = "hide";
      } else {
        showIt.style.display = "none";
        button.innerHTML = "show";
      }
    };

    if (showCountries.length === 1) {
        const country = showCountries[0];
        return ( <Country country={country} /> )
    }

    if (showCountries.length > 10) {
        return (<p>Too many matches, specify another filter</p>)
    }

    return (
        <div>
        {showCountries.map((country) => (
            <span key={country.name.common}>
              <p key={country.name.common}>
                {country.name.common}
                <button key={"btn-"+country.name.common} id={"btn-"+country.name.common} onClick={() => showCountry(country.name.common)}>
                  show
                </button>
              </p>
              <div style={{display: "none"}} key={"info-" + country.name.common} id={"info-" + country.name.common}>
                <Country key={"country-" + country.name.common} country={country} />
              </div>
            </span>
        ))}
        </div>
    );
}

export default Countries
