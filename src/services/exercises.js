import axios from 'axios'

const baseUrl = 'http://localhost:8080/api/v1/exercises'



// Myös funktio getAll palauttaa promisen, sillä promisen metodi then palauttaa promisen.
// Koska then:in parametri palauttaa suoraan arvon response.data,
// on funktion getAll palauttama promise sellainen,
// että jos HTTP-kutsu onnistuu, antaa promise takaisinkutsulleen HTTP-pyynnön mukana olleen datan.

// Kun haluamme tietoon promisea vastaavan operaation tuloksen,
// tulee promiselle rekisteröidä tapahtumankuuntelija. Tämä tapahtuu metodilla then.
// JavaScriptin suoritusympäristö kutsuu then-metodin avulla
// rekisteröityä takaisinkutsufunktiota antaen sille parametriksi olion response.

// then metodille takaisinkutsu/tapahtumankäsittelijä funktio...?

const getAll = () => {
    const request = axios.get(baseUrl) // request on promise olio
   // console.log("request ", request);
    return request.then((response) =>  {
     //   console.log("response ", response);
        return response.data
    }) // metodi then.palauttaa myös promisen.
}

const createNew = async (name, muscle) => {
    const obj = { name: name, muscle: muscle } // { name, muscle } ?
    console.log('sending this to the server: ', obj);
    const response = await axios.post(baseUrl, obj) 
    return response.data
}

const update = async (id, name, muscle ) => {
    const obj = { name: name, muscle: muscle } // { name, muscle } ?
    console.log('sending this to the server: ', obj);
    const response = await axios.put(`${baseUrl}/${id}`, obj)
    return response.data
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

export default {
    getAll, // getAll: getAll, (vanha javascript)
    createNew,
    update,
    remove
}