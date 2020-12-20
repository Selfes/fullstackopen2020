import React from "react";

import personService from '../services/persons'

const PersonForm = (props) => {

  const addPerson = (event) => {
    event.preventDefault();
    const person = { name: props.name, number: props.number };

    if (props.persons.some((elem) => elem.name === props.name)) {
      alert(`${props.name} is already added to phonebook`);
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
