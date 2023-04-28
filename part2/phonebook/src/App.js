import { useState } from 'react'

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])

  const listOfPersons = persons.map(person => person.name)
  
  const [newName, setNewName] = useState([''])

  const addName = (event) => {
    event.preventDefault()
    if (listOfPersons.includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      const Name = { name: newName }
      setPersons(persons.concat(Name))
    }
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input onChange={handleNewName} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((person, i) => <p key={i}>{person.name}</p>)}
      </div>
    </div>
  )
}

export default App;
