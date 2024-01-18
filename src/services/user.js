import axios from 'axios'

const baseUrl = 'https://workout-log-ahlp.onrender.com/api/v1/users'

let token = null

const setToken = newToken => token = `Bearer ${newToken}`

const editUser = async (currentEmail, email, firstname, lastname) => {
    const config = {
        headers: {
            Authorization: token
        }
    }

    const obj = {
        email,
        firstname,
        lastname
    }

    console.log("SENDING THIS LOGIN OBJ TO SERVER: ", obj);
    const response = await axios.put(`${baseUrl}/${currentEmail}/details`, obj, config)
    console.log("LOG RESPONSE ", response)
    return response.data
}

const editPassword = async (email, newPassword, newPasswordAgain) => {
    const config = {
        headers: {
            Authorization: token
        }
    }

    const obj = {
        newPassword,
        newPasswordAgain
    }

    console.log("SENDING THIS LOGIN OBJ TO SERVER: ", obj);
    const response = await axios.put(`${baseUrl}/${email}/password`, obj, config)
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
    editPassword,
    removeUser,
    setToken
}