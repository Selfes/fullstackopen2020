import React from 'react'

const Filter = ({value, filterFunction}) => {
    return (
        <form>
          <label htmlFor="name">find countries: </label>
          <input value={value} onChange={(event) => {filterFunction(event.target.value)}} />
        </form>
    )
}

export default Filter
