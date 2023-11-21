import axios from 'axios'

const baseUrl = 'http://localhost:8080/api/v1/users'

let token = null

const setToken = newToken => token = `Bearer ${newToken}`

const editUser = async (currentEmail, email, firstname, lastname, password) => {
    const config = {
        headers: {
            Authorization: token
        }
    }

    const obj = {
        email,
        firstname,
        lastname,
        password
    }

    console.log("SENDING THIS LOGIN OBJ TO SERVER: ", obj);
    const response = await axios.put(`${baseUrl}/${currentEmail}`, obj, config)
    console.log("LOG RESPONSE ", response)
    return response.data
}

const removeUser = async (userEmail) => {
    const config = {
        headers: {
            Authorization: token
        }
    }
    const response = await axios.delete(`${baseUrl}/${userEmail}`, config)
    console.log("service wait over");

    return response.data
}

export default {
    editUser,
    removeUser,
    setToken
}