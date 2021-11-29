require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
app.use(express.json())
app.use(cors())
app.use(express.static('build'))
const Person = require('./models/person')




let persons = [
  {id: 1,
    name:"Paulin nro",
    number: "0300-300300"
  },
  {
    id: 2,
    name:"Essin nro",
    number: "0400-300300"
  },
  {
    id: 3,
    name:"Adan4 nro",
    number: "0400-300300"
  }
]
app.get('/', (req, res) => {
    res.send('<h1>Hello B-Word!</h1>')
  })
  
  app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
      response.json(persons)
    })
  })
  
  app.get('/api/persons/:id', (request, response, next) => {
 Person.findById(request.params.id)
 .then(person =>{
  if (person) {
    response.json(person)

  } else {
    response.status(404).end()
  }
})
.catch(error => next(error))
  })

  

  
  app.get('/info', (require, response) => {
    const reqTime = new Date(Date.now())
    const length = persons.length
 
response.send(
 
   `<h2>InfoPage</h2>
   <p>PhoneBook has <b>${length}</b> persons at the moment.</p>
  <p>Data from <b>${new Date().toLocaleString()}</b></p><br>
  <p>RAW:  ${reqTime}</p>`   )
})

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/persons', (request, response, next) => {
  
  const body = request.body

  
  const person = new Person ({
    name: body.name,
    number: body.number,
    id: generateId(),
  })

person
.save()
.then(savedPerson => savedPerson.toJSON())
  .then(savedAndFormattedPerson => {
    response.json(savedAndFormattedPerson)
  })
 
  .catch(error => next(error))
})


app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
.then(result => {
  response.status(204).end()
})
  .catch(error => next(error))
    })
   
    const unknownEndpoint = (request, response) => {
      response.status(404).send({ error: 'unknown endpoint' })
    }
    
    app.use(unknownEndpoint)
 



    const errorHandler = (error, request, response, next) => {
      console.error(error.message)
    
      if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
      } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
      }
    
      next(error)
    }
    app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})