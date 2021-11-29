import React from "react"

const Personsform = ({onSubmit, newName, newNumber, handleNameChange, handleNumberChange}) => 

<form onSubmit={onSubmit}>
          <div>
NAME: 
<input value={newName}
onChange={handleNameChange} />
</div>


<div>
NUMBER:
<input value={newNumber}
onChange={handleNumberChange} />
</div>
<button type="submit">ADD PERSON</button>

</form>
      


 






export default Personsform