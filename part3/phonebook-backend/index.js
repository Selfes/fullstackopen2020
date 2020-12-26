// express.js
const express = require('express')
const app = express()
app.use(express.json())
app.use(express.static('build'))

// Cross Origin Resource Sharing
const cors = require('cors')
app.use(cors())

// import Environment variables
require('dotenv').config()

// let persons = [
//     {
//       "id": 1,
//       "name": "Arto Hellas",
//       "number": "040-123456"
//     },
//     {
//       "id": 2,
//       "name": "Ada Lovelace",
//       "number": "39-44-5323523"
//     },
//     {
//       "id": 3,
//       "name": "Dan Abramov",
//       "number": "12-43-234345"
//     },
//     {
//       "id": 4,
//       "name": "Mary Poppendieck",
//       "number": "39-23-6423122"
//     }
//   ]
//
// const generateId = () => {
//   return Math.floor(Math.random() * Math.floor(9999999));
// }

// import mongoose (for MongoDB)
const Person = require('./models/entry')

//enable logging using morgan
const morgan = require('morgan')
morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


app.get('/api/persons', (request, response) => {
    // response.json(persons)
    Person.find({}).then((result) => {
        response.json(result)
    })
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'the name or number is missing'
        })
    }
    //if (persons.some((elem) => elem.name === body.name)) {
    //    return response.status(400).json({
    //        error: 'name must be unique'
    //    })
    //}

    //const person = {
    //    id: generateId(),
    //    name: body.name,
    //    number: body.number
    //}

    const person = new Person({
        name: body.name,
        number: body.number
    })

    //persons = persons.concat(person)

    //response.json(person)

    person.save().then(entry => {
        response.json(entry)
    })
})

app.get('/info', (request, response) => {
    response.send(`Phonebook has info for ${persons.length} people <br><br> ${new Date()}`);
})

app.get('/api/persons/:id', (request, response) => {
    //const id = Number(request.params.id)
    //const person = persons.find((person) => person.id === id)

    //if (person) {
    //    response.json(person)
    //} else {
    //    response.status(404).end("content not found")
    //}

    Person.findById(request.params.id).then(entry => {
        response.json(entry)
    })
})

app.delete('/api/persons/:id', (request, response, next) => {
    // const id = Number(request.params.id)
    // persons = persons.filter((person) => person.id !== id)

    // response.status(204).end("deletion complete")

    Person.findByIdAndDelete(request.params.id)
          .then((result) => {
              response.status(204).end()
          })
          .catch((error) => next(error))
})

// Port listening
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

