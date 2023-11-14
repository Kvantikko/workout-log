import axios from 'axios'

const baseUrl = 'http://localhost:8080/api/v1/workouts'

let token = null

const setToken = newToken => { token = `Bearer ${newToken}` }

const config = {
    headers: {
        Authorization: token
    }
}

const getAll = () => {
    const request = axios.get(baseUrl, config) // request on promise olio
    console.log("request ", request);
    return request.then((response) =>  {
        console.log("response ", response);
        return response.data
    }) // metodi then.palauttaa myös promisen.
}

const createNew = async (workout) => {
    // we send IDs to the server too, but it ignores it and creates its own 
    console.log('sending this to the server: ', workout);
    const response = await axios.post(baseUrl, workout, config) 
    return response
}

const update = async (id, name, muscle ) => {
    const obj = { name: name, muscle: muscle } // { name, muscle } ?
    console.log('sending this to the server: ', obj);
    const response = await axios.put(`${baseUrl}/${id}`, obj, config)
    return response.data
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`, config)
}

export default {
    getAll, // getAll: getAll, (vanha javascript)
    createNew,
    update,
    remove,
    setToken
}