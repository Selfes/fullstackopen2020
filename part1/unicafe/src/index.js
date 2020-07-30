import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Display = ({counter, text}) => (
  <p>{text} {counter}</p>
)

const StatCalc = ({good, bad, all}) => {
  const average = (good-bad)/all;
  const positive = good/all*100;
  if (all) {
    return (
      <>
        <Display counter={average} text="average" />
        <Display counter={positive+"%"} text="positive" />
      </>
    )
  } else {
    return (<></>)
  }
}

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad;
  return (
    <>
      <Display counter={good} text="good" />
      <Display counter={neutral} text="neutral" />
      <Display counter={bad} text="bad" />
      <Display counter={all} text="all" />
      <StatCalc good={good} bad={bad} all={all}/>
    </>
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
