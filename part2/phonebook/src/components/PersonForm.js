import React from "react";

import personService from '../services/persons'

const PersonForm = (props) => {

  const addPerson = (event) => {
    event.preventDefault();
    const person = { name: props.name, number: props.number };

    if (props.persons.some((elem) => elem.name === props.name)) {
      if (window.confirm(`${props.name} is already added to phonebook, replace the old number with a new one?`)) {
        const findPerson = props.persons.find(p => p.name === props.name)
        const changedPerson = {...findPerson, number: props.number }
        personService
          .update(changedPerson)
          .then((updatePerson) => {
            props.addPerson(props.persons.map(p => p.id !== updatePerson.id ? p : updatePerson));
            props.nameSetter("");
            props.numberSetter("");
          })
      }
      return;
    }
    personService
      .create(person)
      .then((newPerson) => {
        props.addPerson(props.persons.concat(newPerson));
        props.nameSetter("");
        props.numberSetter("");
      })
      .catch((error) => {
        console.log(error)
      })
  };

  return (
    <>
      <form onSubmit={addPerson}>
        <div>
          name:{" "}
          <input
            value={props.name}
            onChange={(event) => {
              props.nameSetter(event.target.value);
            }}
          />
        </div>
        <div>
          number:{" "}
          <input
            value={props.number}
            onChange={(event) => {
              props.numberSetter(event.target.value);
            }}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

export default PersonForm;
