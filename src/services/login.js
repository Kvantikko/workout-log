import axios from 'axios'
import { toast } from 'react-toastify'

const baseUrl = 'https://workout-log-ahlp.onrender.com/api/v1/auth'   //  'http://localhost:8080/api/v1/auth'

// Myös funktio getAll palauttaa promisen, sillä promisen metodi then palauttaa promisen.
// Koska then:in parametri palauttaa suoraan arvon response.data,
// on funktion getAll palauttama promise sellainen,
// että jos HTTP-kutsu onnistuu, antaa promise takaisinkutsulleen HTTP-pyynnön mukana olleen datan.

// Kun haluamme tietoon promisea vastaavan operaation tuloksen,
// tulee promiselle rekisteröidä tapahtumankuuntelija. Tämä tapahtuu metodilla then.
// JavaScriptin suoritusympäristö kutsuu then-metodin avulla
// rekisteröityä takaisinkutsufunktiota antaen sille parametriksi olion response.

// then metodille takaisinkutsu/tapahtumankäsittelijä funktio...?

const login = async ( email, password ) => {
    const obj = { email, password }

    /* let toastId
    const timeoutId = setTimeout(() => {
        toastId = toast(
            "My free server has spun down and needs to restart. This might take a minute or two. Please wait...", {
            autoClose: false,
            position: "top-right",
            style: { backgroundColor: "#c21313" },
            isLoading: true,
            closeButton: false,
            closeOnClick: false,
            draggable: false
        })
    }, 8000) */

    console.log("SENDING: ", obj );

    const response = await axios.post(`${baseUrl}/authenticate`, obj)

   /*  clearTimeout(timeoutId)
    toast.update(toastId, {
        render: "Logged in, thank you for being patient!",
        type: toast.TYPE.SUCCESS,
        isLoading: false,
        closeButton: true,
        closeOnClick: true,
        draggable: true,
        style: { backgroundColor: "#474747" },
        autoClose: 4000
    }) */

    return response.data
}

const register = async ( email, firstname, lastname, password ) => {
    const obj = { email, firstname, lastname, password }
    const response = await axios.post(`${baseUrl}/register`, obj)
    return response.data
}

export default {
    login,
    register
}