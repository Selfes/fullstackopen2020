import React from 'react'

const Total = ({ course }) => {
  const totalStyle = {
      fontWeight: 'bold',
  };
  const sum = course.parts.reduce( (total, part) => total + part.exercises, 0)
  return(
    <p style={totalStyle}>total of {sum} exercises</p>
  )
}

export default Total
