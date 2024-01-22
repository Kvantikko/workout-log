import axios from 'axios'

const baseUrl = 'https://workout-log-ahlp.onrender.com/api/v1/templates'

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
    const request = axios.get(`${baseUrl}?email=${userEmail}`, config) 
    const response = await request
    return response.data 
}

const createNew = async (workoutTemplate) => {
    const config = {
        headers: {
            Authorization: token
        }
    }
    // we send IDs to the server too, but it ignores it and creates its own 
    const response = await axios.post(baseUrl, workoutTemplate, config) 
    return response.data
}

const update = async (id, template) => {
    const config = {
        headers: {
            Authorization: token
        }
    }
    const obj = template
    const response = await axios.put(`${baseUrl}/${id}`, obj, config)
    return response.data
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