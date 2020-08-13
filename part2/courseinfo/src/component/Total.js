import React from 'react'

const Total = ({ course }) => {
  const totalStyle = {
      fontWeight: 'bold',
  };
  const total = course.parts.reduce( (total, part) => total + part.exercises, 0)
  return(
    <p style={totalStyle}>total of {total} exercises</p>
  )
}

export default Total
