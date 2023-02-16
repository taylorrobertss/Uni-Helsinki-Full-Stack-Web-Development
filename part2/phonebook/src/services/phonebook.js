import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'


const getAll = () => {
    const request = axios.get(baseUrl)
   
    return request.then(response => response.data)
  }
const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const deleteItem = (personId) => {
    const url = `${baseUrl}/${personId}`
    const request = axios.delete(url)
    return request.then(response => response.data)
    // return request.then()
  }
const replaceNumber= (id, newObject) =>{
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}
export default {  create, deleteItem, getAll, replaceNumber }