import axios from 'axios'

const baseUrl = 'http://localhost:8080/api/v1/measurements'

let token = null

const setToken = newToken => { 
    console.log("SETTIN TOKEN ", newToken)
    token = `Bearer ${newToken}`
}

const getAllMeasurements = async () => {
    const config = {
        headers: {
            Authorization: token
        }
    }

    //console.log("CONFIG ", config);
    const request = axios.get(baseUrl, config) // request on promise olio
    console.log("REQUESTTT ", request);
    const response = await request
    console.log("RESPO 1 ", response  );
    return response.data // metodi then.palauttaa myös promisen.
}

const getAllMeasurementValues = async (userEmail) => {
    const config = {
        headers: {
            Authorization: token
        }
    }

    //console.log("CONFIG ", config);
    const request = axios.get(`${baseUrl}/values?email=${userEmail}`, config) // request on promise olio
    // console.log("request ", request);
    const response = await request
    console.log("RESPO 2", response  );
    return response.data // metodi then.palauttaa myös promisen.
}

/* axios.get('your_backend_api_url', {
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json', // Adjust the content type if needed
    },
  }) */

const createNewValue = async (userEmail, measurementId, value) => {
    const config = {
        headers: {
            Authorization: token
        }
    }

    const obj = { userEmail, measurementId, value }
   // console.log('sending this to the server: ', obj);
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
    console.log('sending this to the server: ', dto);
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