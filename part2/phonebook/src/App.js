import React, { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterName, setFilterName ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons)
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
