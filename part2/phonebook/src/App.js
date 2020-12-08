import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-1234567' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterName, setFilterName ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const person = { name: newName, number: newNumber }

    if (persons.some(elem => elem.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    setPersons(persons.concat(person))
    setNewName('')
  }

  const showPersons = filterName ? persons.filter((person) => person.name.toLowerCase().includes(filterName.toLowerCase())) : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <input value={filterName} onChange={(event) => {setFilterName(event.target.value)}} />
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={(event) => {setNewName(event.target.value)}} />
        </div>
        <div>
          number: <input value={newNumber} onChange={(event) => {setNewNumber(event.target.value)}} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {showPersons.map((person) => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  )
}

export default App
