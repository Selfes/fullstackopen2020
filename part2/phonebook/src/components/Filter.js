import React from 'react'

const Filter = (props) => {
    return (
        <>
          <input value={props.value} onChange={(event) => {props.filterFunction(event.target.value)}} />
        </>
    )
}

export default Filter
