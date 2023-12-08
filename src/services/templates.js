import axios from 'axios'

const baseUrl = 'http://localhost:8080/api/v1/templates'

let token = null

const setToken = newToken => { token = `Bearer ${newToken}` }

const config = {
    headers: {
        Authorization: token
    }
}

const getAllUserTemplates = async (userEmail) => {
    const config = {
        headers: {
            Authorization: token
        }
    }
    const request = axios.get(`${baseUrl}?email=${userEmail}`, config) // request on promise olio
    console.log("request ", request);
    const response = await request
    console.log("response ", response)
    return response.data // metodi then.palauttaa myös promisen.
}

const createNew = async (workoutTemplate) => {
    const config = {
        headers: {
            Authorization: token
        }
    }
    // we send IDs to the server too, but it ignores it and creates its own 
    console.log('sending this to the server: ', workoutTemplate);
    const response = await axios.post(baseUrl, workoutTemplate, config) 
    return response
}

const update = async (id, name, muscle ) => {
    /* const config = {
        headers: {
            Authorization: token
        }
    }
    const obj = { name: name, muscle: muscle } // { name, muscle } ?
    console.log('sending this to the server: ', obj);
    const response = await axios.put(`${baseUrl}/${id}`, obj, config)
    return response.data */
}

const remove = (id) => {
    const config = {
        headers: {
            Authorization: token
        }
    }
    return axios.delete(`${baseUrl}/${id}`, config)
}

export default {
    getAllUserTemplates, // getAll: getAll, (vanha javascript)
    createNew,
    update,
    remove,
    setToken,
}