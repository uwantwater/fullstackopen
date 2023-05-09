import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const url = `${baseUrl}/${id}`
    axios.put(url, newObject)
    return(getAll())
}

const remove = (id) => {
    axios.delete(`${baseUrl}/${id}`)
    return(getAll())
}

export default { getAll, create, update, remove }