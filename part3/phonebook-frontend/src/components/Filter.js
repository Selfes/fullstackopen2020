import React from 'react'

const Filter = (props) => {
    return (
        <form>
          <label htmlFor={"filterName"}>Search: </label>
          <input id={"filterName"} value={props.value} onChange={(event) => {props.filterFunction(event.target.value)}} />
        </form>
    )
}

export default Filter
