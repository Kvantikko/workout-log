import axios from 'axios'

const baseUrl = 'http://localhost:8080/api/v1/auth'



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

    const obj = { email, password } // { name, muscle } ?
    console.log("SENDING THIS LOGIN OBJ TO SERVER: ", obj);
    const response = await axios.post(`${baseUrl}/authenticate`, obj)
    console.log("LOG RESPONSE ", response)
    return response.data
}

const register = async ( email, firstname, lastname, password ) => {

    const obj = { email, firstname, lastname, password }
    console.log("SENDING THIS REGISTER OBJ TO SERVER: ", obj);
    const response = await axios.post(`${baseUrl}/register`, obj)
    console.log("REG RESPONSE ", response)
    return response.data
}

export default {
    login,
    register
}