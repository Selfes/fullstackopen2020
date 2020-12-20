import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import Countries from './components/Countries.js'

function App() {
  const [countries, setCountries] = useState([])
  const [filterCountry, setFilterCountry] = useState("")

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((response) => setCountries(response.data))
  }, []);

  return (
      <div>
      <Filter value={filterCountry}  filterFunction={setFilterCountry} />
      <Countries filter={filterCountry}  countries={countries} />
      </div>
  );
}

export default App;
