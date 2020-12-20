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

    props.addPerson(props.persons.concat(person));
    props.nameSetter("");
    props.numberSetter("");
    return personService.create(person).then(response => response.data);
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
