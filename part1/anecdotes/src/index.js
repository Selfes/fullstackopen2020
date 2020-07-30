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

  // Use this function from Stackoverflow to find the index of the biggest number
  // (according to him, it's more efficient)
  // https://stackoverflow.com/a/11301464
  function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <Vote counter={votes[selected]} />
      <Button text="vote" handleClick={() => setVotes(voteAnecdote(votes, selected))} />
      <Button text="next anecdote" handleClick={() => setSelected(selectRandomNumber())} />
      <h1>Anecdote with most votes</h1>
      <p>{props.anecdotes[indexOfMax(votes)]}</p>
      <Vote counter={votes[indexOfMax(votes)]} />
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
