import axios from 'axios'

const baseUrl = 'https://workout-log-ahlp.onrender.com/api/v1/measurements'

let token = null

const setToken = newToken => { 
    token = `Bearer ${newToken}`
}

const getAllMeasurements = async () => {
    const config = {
        headers: {
            Authorization: token
        }
    }

    const request = axios.get(baseUrl, config) 
    const response = await request
    return response.data 
}

const getAllMeasurementValues = async (userEmail) => {
    const config = {
        headers: {
            Authorization: token
        }
    }

    const request = axios.get(`${baseUrl}/values?email=${userEmail}`, config) 
    const response = await request
    return response.data 
}

const createNewValue = async (userEmail, measurementId, value) => {
    const config = {
        headers: {
            Authorization: token
        }
    }

    const obj = { userEmail, measurementId, value }
    const response = await axios.post(`${baseUrl}/values`, obj, config)
    return response.data
}

const updateValue = async (measurementValueId, value) => {
    const config = {
        headers: {
            Authorization: token
        }
    }

    const dto = { measurementValueId, value }
    const response = await axios.put(`${baseUrl}/values/${measurementValueId}`, dto, config)
    if (response.status === 200) {
        return response.data
    } else {
        return response
    }

}

const removeValue = (id) => {
    const config = {
        headers: {
            Authorization: token
        }
    }

    return axios.delete(`${baseUrl}/values/${id}`, config)
}

export default {
    getAllMeasurements,
    getAllMeasurementValues,
    createNewValue,
    updateValue,
    removeValue,
    setToken
}