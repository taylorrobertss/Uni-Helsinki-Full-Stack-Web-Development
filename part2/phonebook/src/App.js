import { useState } from 'react'
import Display from './components/Display'
import Filter from './components/Filter'
import Name from './components/Name'
import Number from './components/Number'
const App = () => {
  const [persons, setPersons] = useState([
    { id: 1, name: 'Arto Hellas', number: "098-763-4542" },
    { id: 2, name: 'Jane June', number: "098-763-4542" },
    { id: 3, name: 'Taylor Smith', number: "098-763-4542" },
    { id: 4, name: 'Henery Smoth', number: "098-763-4542" }
  ]) 
  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [newSearch, setNewSearch] = useState('')

  const personsToShow = newSearch === '' 
  ? persons
  : persons.filter(person => person.name.toUpperCase().includes(newSearch.toUpperCase()))
  
  const handleSearchName = (event) =>{
    
    setNewSearch(event.target.value)
  }
  const handleNameChange = (event) =>{
        console.log(event.target.value)
        setNewName(event.target.value)
        
  }
  const handleNumberChange = (event) =>{
    console.log(event.target.value)
    setNewNumber(event.target.value)
    
}

     const addPerson = (event) => {
     event.preventDefault()
     console.log('button clicked', event.target)
     let mapped =persons.map(persons => persons.name)
     let found =mapped.includes(newName)

     if(found){
      console.log("Name is already in the list")
      alert(`${newName} is already added to phonebook`)
     }
     else{
      if(newName !== '' ){
        
        const personObject = {
          name: newName, 
          id: persons.length + 1,
          number: newNumber
        
        }
        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')

      }
     }
        
    }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleSearchName={handleSearchName} newSearch={newSearch}/>
     
      <h2>Add a new Person</h2>

      <form onSubmit={addPerson}>
        <Name handleNameChange={handleNameChange} newName={newName}/>
        <Number handleNumberChange={handleNumberChange} newNumber={newNumber}/>
         <button type="submit">add</button>
       </form>   

      <h2>Numbers</h2>
      <Display personsToShow={personsToShow}/>
    
    </div>
    
  )
}

export default App