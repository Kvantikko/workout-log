import axios from 'axios'

const baseUrl = 'http://localhost:8080/api/v1/users'

let token = null

const setToken = newToken => token = `Bearer ${newToken}`

const getAllUserWorkouts = async (userId) => {
    const config = {
        headers: {
            Authorization: token
        }
    }

    console.log("SENDING THIS LOGIN OBJ TO SERVER: ", obj);
    const response = await axios.post(`${baseUrl}/${userId}/workouts`, config)
    console.log("LOG RESPONSE ", response)
    return response.data
}


export default {
    getAllUserWorkouts 
}