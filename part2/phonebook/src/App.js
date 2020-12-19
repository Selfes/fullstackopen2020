import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterName, setFilterName ] = useState('')

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => {
        setPersons(response.data)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterName} filterFunction={setFilterName} />
      <h3>Add a new</h3>
      <PersonForm
         persons={persons} addPerson={setPersons}
         name={newName} nameSetter={setNewName}
         number={newNumber} numberSetter={setNewNumber}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} filterName={filterName} />
    </div>
  )
}

export default App
