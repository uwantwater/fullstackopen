import { useState, useEffect } from 'react'
import personsService from './services/persons'

const AddNew = ({ onSub, onChName, onChNum }) => {
  return (
    <>
      <h3>add a new</h3>
      <form onSubmit={onSub}>
        <div>
          name: <input onChange={onChName} />
        </div>
        <div>
          number: <input onChange={onChNum}/>
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
    </>
  )
}

const Filter = ({ persons }) => {
  const [search, setNewSearch] = useState([''])
  const [matches, setNewMatches] = useState([{}])

  const handleSearchTerm = (event) => {
    setNewSearch(event.target.value)
    const regex = new RegExp(search, 'i')
    const filtering = persons.filter((person) => regex.test(person.name))
    setNewMatches(filtering)   
  }
  return (
    <>
      <div>filter shown with: <input onChange={handleSearchTerm}/></div>
      <div>
        {matches.map((match, i) => <p key={i}>{match.name} {match.number}</p>)}
      </div>
    </>
  )
}

const Person = ({ person, toggleDelete }) => {
  return (
    <p key={person.id}>
      {person.name} {person.number} <button onClick={toggleDelete}>delete</button>
    </p>
  )
}

const App = () => {

  const [persons, setPersons] = useState([])

  useEffect(() => {
    personsService
      .getAll()
      .then(initialList => setPersons(initialList))
  }, [])

  const listOfPersons = persons.map(person => person.name)
  
  const [newName, setNewName] = useState([''])
  const [newNum, setNewNum] = useState([''])

  const addPerson = (event) => {
    event.preventDefault()
    if (listOfPersons.includes(newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)) {
        const reqId = listOfPersons.findIndex(i => i === newName) + 1
        personsService.update(reqId, {name: newName,
                                      number: newNum,
                                      id: reqId})
          .then(updatedPersons => setPersons(updatedPersons))
      }
    }
    else {
      const personObject = {
         name: newName,
         number: newNum,
         id: persons.length + 1 
        }
      personsService
        .create(personObject)
        .then(newPerson => setPersons(persons.concat(newPerson)))
    }
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }
  const handleNewNum = (event) => {
    setNewNum(event.target.value)
  }
  const toggleDelete = (id) => {
    if (window.confirm(`Delete ${persons[id - 1].name}?`)) {
      personsService
        .remove(id)
        .then(updatedPersons => setPersons(updatedPersons))
      }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter persons={persons} />
      <AddNew onSub={addPerson} onChName={handleNewName} onChNum={handleNewNum} />
      <h3>Numbers</h3>
      <div>
        {persons.map(person => <Person person={person} toggleDelete={() => toggleDelete(person.id)} key={person.id}/>)}
      </div>
    </div>
  )
}

export default App;