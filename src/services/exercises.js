import axios from 'axios'

const baseUrl = 'http://localhost:8080/api/v1/exercises'

let token = null

const setToken = newToken => { 
    token = `Bearer ${newToken}`
}



// Myös funktio getAll palauttaa promisen, sillä promisen metodi then palauttaa promisen.
// Koska then:in parametri palauttaa suoraan arvon response.data,
// on funktion getAll palauttama promise sellainen,
// että jos HTTP-kutsu onnistuu, antaa promise takaisinkutsulleen HTTP-pyynnön mukana olleen datan.

// Kun haluamme tietoon promisea vastaavan operaation tuloksen,
// tulee promiselle rekisteröidä tapahtumankuuntelija. Tämä tapahtuu metodilla then.
// JavaScriptin suoritusympäristö kutsuu then-metodin avulla
// rekisteröityä takaisinkutsufunktiota antaen sille parametriksi olion response.

// then metodille takaisinkutsu/tapahtumankäsittelijä funktio...?



const getAll = async () => {
    const config = {
        headers: {
            Authorization: token
        }
    }

    //console.log("CONFIG ", config);
    const request = axios.get(baseUrl, config) // request on promise olio
    // console.log("request ", request);
    const response = await request
    //console.log("RESPO ", response  );
    return response.data // metodi then.palauttaa myös promisen.
}

/* axios.get('your_backend_api_url', {
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json', // Adjust the content type if needed
    },
  }) */

const createNew = async (name, muscle) => {
    const config = {
        headers: {
            Authorization: token
        }
    }

    const obj = { name: name, muscle: muscle } // { name, muscle } ?
   // console.log('sending this to the server: ', obj);
    const response = await axios.post(baseUrl, obj, config)
    return response.data
}

const update = async (id, name, muscle) => {
    const config = {
        headers: {
            Authorization: token
        }
    }

    const obj = { name: name, muscle: muscle } // { name, muscle } ?
    //console.log('sending this to the server: ', obj);
    const response = await axios.put(`${baseUrl}/${id}`, obj, config)
    if (response.status === 200) {
        return response.data
    } else {
        return response
    }

}

const remove = (id) => {
    const config = {
        headers: {
            Authorization: token
        }
    }

    return axios.delete(`${baseUrl}/${id}`, config)
}

const getHistory = async (userEmail, exerciseId) => {
    const config = {
        headers: {
            Authorization: token
        }
    }

    const response = await axios.get(`${baseUrl}/${exerciseId}?email=${userEmail}`, config)
    return response.data
}

const getHistoryBetween = async (id, startDate, endDate) => {
    const config = {
        headers: {
            Authorization: token
        }
    }

    const requestObj = { start: startDate, end: endDate }
    //console.log("requestObj ", requestObj);

    const response = await axios.post(`${baseUrl}/${id}`, requestObj, config) // request on promise olio
    //console.log("await over")
    return response.data // metodi then.palauttaa myös promisen.
}

export default {
    getAll, // getAll: getAll, (vanha javascript)
    createNew,
    update,
    remove,
    getHistory,
    setToken
}