import React from 'react';
import ReactDOM from 'react-dom';
import Course from './component/Course'

// const Total = ({ course }) => {
//   const sum = course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises
//   return(
//     <p>Number of exercises {sum}</p>
//   )
// }


const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
  // (
  //   <div>
  //     <Header course={course} />
  //     <Content course={course} />
  //     <Total course={course} />
  //   </div>
  // )
}

ReactDOM.render(<App />, document.getElementById('root'))
