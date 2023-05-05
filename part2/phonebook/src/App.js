import { useState, useEffect } from 'react'
import axios from 'axios'

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

const Persons = ({ persons }) => {
  return (
    <>
      {persons.map((person) => <p key={person.id}>{person.name} {person.number}</p>)}
    </>
  )
}

const App = () => {

  const [persons, setPersons] = useState([])

  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      console.log('promise fulfilled')
      setPersons(response.data)
    })
  })

  const listOfPersons = persons.map(person => person.name)
  
  const [newName, setNewName] = useState([''])
  const [newNum, setNewNum] = useState([''])

  const addPerson = (event) => {
    event.preventDefault()
    if (listOfPersons.includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      const personObject = {
         name: newName,
         number: newNum,
         id: persons.length + 1 
        }
      setPersons(persons.concat(personObject))
    }
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }
  const handleNewNum = (event) => {
    setNewNum(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter persons={persons}/>
      <AddNew onSub={addPerson} onChName={handleNewName} onChNum={handleNewNum}/>
      <h3>Numbers</h3>
      <div>
        <Persons persons={persons}/>
      </div>
    </div>
  )
}

export default App;
