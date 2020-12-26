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

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const newEntry = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(request.params.id, newEntry, { new: true})
          .then((updatedEntry) => response.json(updatedEntry))
          .catch((error) => next(error))
})

app.get('/info', (request, response) => {
    Person.estimatedDocumentCount((error, count) => {
       if (error) {
           console.log(error)
           response.status(500).send({ error: "Problem with accessing the database"})
       } else {
           response.send(`Phonebook has info for ${count} people <br><br> ${new Date()}`);
       }
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    //const id = Number(request.params.id)
    //const person = persons.find((person) => person.id === id)

    //if (person) {
    //    response.json(person)
    //} else {
    //    response.status(404).end("content not found")
    //}

    Person.findById(request.params.id).then(entry => {
        if (entry) {
            response.json(entry)
        } else {
            response.status(404).end()
        }
    }).catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    // const id = Number(request.params.id)
    // persons = persons.filter((person) => person.id !== id)

    // response.status(204).end("deletion complete")

    Person.findByIdAndDelete(request.params.id)
          .then((result) => {
              response.status(204).end()
          })
})


// just copy pasted from the fullstack git repo
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)
app.use(errorHandler)

// Port listening
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

