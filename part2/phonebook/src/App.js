import { useState, useEffect } from 'react'
import Display from './components/Display'
import axios from 'axios'
import Filter from './components/Filter'
import Name from './components/Name'
import Number from './components/Number'
import Notification from './components/Notification'
import Error from './components/Error'
import phoneServices from './services/phonebook'
import './index.css'
const App = () => {
  const [persons, setPersons] = useState([
  ])
  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [newSearch, setNewSearch] = useState('')

  const [notificationMessage, setNotification] = useState(null)
  const [ErrorMessage, setError] = useState(null)

  const personsToShow = newSearch === ''
    ? persons
    : persons.filter(person => person.name.toUpperCase().includes(newSearch.toUpperCase()))
  const hook = () => {
    console.log('effect')
    axios
      .get('api/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }

  useEffect(hook, [])

  console.log('render', persons.length, 'persons')
  const handleSearchName = (event) => {

    setNewSearch(event.target.value)
  }
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)

  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)

    setNewNumber(event.target.value)

  }
  const removeItem = (id) => {
    phoneServices.deleteItem(id)
      .then(returnedPerson => {
        const result = window.confirm(`Delete ${persons.find(person => person.id === id).name}?`)
        if (result)
          setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error => {
        alert("Something went wrong")
      })
  }


  const addPerson = (event) => {
    const personToBeSearched = persons.find((person) => person.name === newName)
    event.preventDefault()
    console.log('button clicked', event.target)
    let mapped = persons.map(persons => persons.name)
    let found = mapped.includes(newName)

    if (found) {
      const result = window.confirm(`${personToBeSearched.name} is already added to phonebook, replace the old number with a new one?`)
      if (result) {
        const updatedPerson = { ...personToBeSearched, number: newNumber }
        phoneServices.replaceNumber(updatedPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))

            setNotification(
              `Number for ${personToBeSearched.name} has been updated successfully!`
            );
            setTimeout(() => {
              setNotification(null);
            }, 3500);
          })
          .catch((error) => {
            console.log("test")
            setError(
              `Information of ${personToBeSearched.name} has already been removed from the server!`
            );
            setTimeout(() => {
              setError(null);
            }, 3500);
          });

      }
    }
    else {

      if (newName !== '') {

        const personObject = {
          name: newName,
          id: persons.length + 1,
          number: newNumber

        }

        phoneServices
          .create(personObject)
          .then(returnedNote => {
            setPersons(persons.concat(returnedNote))
            setNewName('')
            setNewNumber('')
            setNotification(
              `Added '${personObject.name}' `
            )
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })

          .catch((error) => {
            console.log("test")
            setError(error.response.data.error);
            setTimeout(() => {
              setError(null);
            }, 3500);
          });

      }
    }

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleSearchName={handleSearchName} newSearch={newSearch} />

      <h2>Add a new Person</h2>
      <Notification message={notificationMessage} />
      <Error message={ErrorMessage} />
      <form onSubmit={addPerson}>
        <Name handleNameChange={handleNameChange} newName={newName} />
        <Number handleNumberChange={handleNumberChange} newNumber={newNumber} />
        <button type="submit">add</button>
      </form>

      <h2>Numbers</h2>
      <Display removeItem={removeItem} personsToShow={personsToShow} />

    </div>

  )
}


export default App