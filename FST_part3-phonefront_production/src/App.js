import React, { useState, useEffect } from 'react'

import Person from './components/Person'
import Personsform from './components/Personsform'
import personsService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  
  useEffect(() => {
    console.log('effect')
   personsService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, 'persons')



  const addNewPerson= (event) => {
    event.preventDefault()
    
    const personCheck = persons.map(person => person.name)
 
    const personObject={
      name:newName,
      number:newNumber
    }

    personsService
    .create(personObject)
      .then(returnedPerson => {

     
  

if (personCheck.includes(`${personObject.name}`))
window.confirm(`Name ${newName} already exists!`)


else

setPersons(persons.concat(returnedPerson))

setNewName('')
setNewNumber('')
})
}


  const handleNameChange = (event) =>{
    console.log(event.target.value)
  setNewName(event.target.value)
  }
  
  
  const handleNumberChange = (event) =>{
    console.log(event.target.value)
  setNewNumber(event.target.value)
  }
 
  const handleWipeout = (id) => {
    const dude = persons.find((dude) => dude.id === id)
    const confirmWipe = window.confirm(`Delete ${dude.name} for real?`)
    
    if (confirmWipe) {
      personsService
      .remove(id)
      .then(() => {
        const leftPersons = persons.filter((person) => person.id !==id)
        setPersons(leftPersons)
      })
    
    
    }
    }
    
  
  
  
    return (
      <div>
        <h2>Phonebook</h2>
        <ul>
        {persons.map(person =>
  <Person key={person.id} person={person} handleWipeout={handleWipeout} />)}
        </ul>
        
        
        <h2>Numbers</h2>
<Personsform onSubmit={addNewPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
  
        
      </div>
    )
  
  }
  
  export default App