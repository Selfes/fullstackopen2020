import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistic = ({counter, text}) => (
  <tr>
    <td>{text}</td>
    <td>{counter}</td>
  </tr>
)


const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad;
  const average = (good-bad)/all;
  const positive = good/all*100;
  if (!all) return (<p>No feedback given</p>)
  return (
    <table>
      <tbody>
        <Statistic counter={good} text="good" />
        <Statistic counter={neutral} text="neutral" />
        <Statistic counter={bad} text="bad" />
        <Statistic counter={all} text="all" />
        <Statistic counter={average} text="average" />
        <Statistic counter={positive+"%"} text="positive" />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good+1)} text="good" />
      <Button handleClick={() => setNeutral(neutral+1)} text="neutral" />
      <Button handleClick={() => setBad(bad+1)} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
