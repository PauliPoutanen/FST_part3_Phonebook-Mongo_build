import React from 'react'


const Person = ({ person, handleWipeout}) => {
  return (
    <li>{person.name} {person.number} 
  {''}  {''}  {''} 
  <button onClick={()=>handleWipeout(person.id)}>Delete</button>
  

    </li>
  )
}

export default  Person