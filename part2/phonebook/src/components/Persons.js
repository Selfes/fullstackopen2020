import React from 'react'

const Persons = (props) => {
    const showPersons = props.filterName ? props.persons.filter((person) => person.name.toLowerCase().includes(props.filterName.toLowerCase())) : props.persons

    return (
        <div>
          {showPersons.map((person) => <p key={person.name}>{person.name} {person.number}</p>)}
        </div>
    )
}

export default Persons
