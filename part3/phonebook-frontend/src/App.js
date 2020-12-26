import React, { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterName, setFilterName ] = useState('')
  const [ notification, setNotification ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState(false)

  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons)
      })
      .catch((error) => console.log(error))
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification error={errorMessage} message={notification}/>
      <Filter value={filterName} filterFunction={setFilterName} />
      <h3>Add a new</h3>
      <PersonForm
         persons={persons} addPerson={setPersons}
         name={newName} nameSetter={setNewName}
         number={newNumber} numberSetter={setNewNumber}
         message={notification} setMessage={setNotification}
         errorValue={errorMessage} error={setErrorMessage}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} changePersons={setPersons} filterName={filterName}
               message={notification} setMessage={setNotification}
               errorValue={errorMessage} error={setErrorMessage}
      />
    </div>
  )
}

export default App
