import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Vote = ({counter}) => (<p>has {counter} votes</p>)

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(props.anecdotes.length).fill(0))

  // Random from Stackoverflow
  // (https://stackoverflow.com/questions/5708784/how-do-i-choose-a-random-value-from-an-array-with-javascript)
  const selectRandomNumber = () => {
    return Math.floor(Math.random() * props.anecdotes.length);
  }

  const voteAnecdote = (points, selected) => {
    const copy = [...points];
    copy[selected] += 1;
    return copy;
  }

  return (
    <div>
      <p>{props.anecdotes[selected]}</p>
      <Vote counter={votes[selected]} />
      <Button text="vote" handleClick={() => setVotes(voteAnecdote(votes, selected))} />
      <Button text="next anecdote" handleClick={() => setSelected(selectRandomNumber())} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
