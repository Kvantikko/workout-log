import axios from 'axios'

const baseUrl = 'http://localhost:8080/api/v1/workouts'

let token = null

const setToken = newToken => { token = `Bearer ${newToken}` }

const config = {
    headers: {
        Authorization: token
    }
}

const getAllUserWorkouts = async (userEmail) => {
    const config = {
        headers: {
            Authorization: token
        }
    }
    const request = axios.get(`${baseUrl}?email=${userEmail}`, config) // request on promise olio
    console.log("request ", request);
    const response = await request
    console.log("response ALL WORKOUTS ", response)
    return response.data // metodi then.palauttaa myös promisen.
}

const getByMonth = async (userEmail, month, year) => {
    const config = {
        headers: {
            Authorization: token
        }
    }
    const request = axios.get(`${baseUrl}?email=${userEmail}&month=${month}&year=${year}`, config) // request on promise olio
    console.log("request ", request);
    const response = await request
    console.log("response ", response)
    return response.data // metodi then.palauttaa myös promisen.
}

const createNew = async (workout) => {
    const config = {
        headers: {
            Authorization: token
        }
    }
    // we send IDs to the server too, but it ignores it and creates its own 
    console.log('sending this to the server: ', workout);
    const response = await axios.post(baseUrl, workout, config) 
    return response.data
}

const update = async (id, obj ) => {
    const config = {
        headers: {
            Authorization: token
        }
    }
    console.log('sending this to the server: ', obj);
    const response = await axios.put(`${baseUrl}/${id}`, obj, config)
    return response.data
}

const remove = (id) => {
    console.log("AXIOS REMOVE WORKOUT, ID: ", id);
    const config = {
        headers: {
            Authorization: token
        }
    }
    return axios.delete(`${baseUrl}/${id}`, config)
}

export default {
    getAllUserWorkouts, // getAll: getAll, (vanha javascript)
    createNew,
    update,
    remove,
    setToken,
    getByMonth
}