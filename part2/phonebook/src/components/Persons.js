import React from 'react'

import personService from '../services/persons'

const Persons = (props) => {
    const showPersons = props.filterName ? props.persons.filter((person) => person.name.toLowerCase().includes(props.filterName.toLowerCase())) : props.persons

    const removePerson = (removePerson) => {
        if (window.confirm(`Delete ${removePerson.name}`)) {
            personService
                .remove(removePerson.id)
                .then(() => props.changePersons(props.persons.filter(person => person.id !== removePerson.id)))
            props.setMessage(`Removed ${removePerson.name}`)
            props.error(false)
            setTimeout(() => props.setMessage(''), 5000)
        }
    }

    return (
        <div>
          {showPersons.map((person) => <p key={person.name}>{person.name} {person.number} <button key={person.name} onClick={() => removePerson(person)}>delete</button></p>)}
        </div>
    )
}

export default Persons
