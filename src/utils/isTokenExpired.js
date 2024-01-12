import { jwtDecode } from 'jwt-decode'

export const isTokenExpired = () => {
    const token = window.localStorage.getItem('userToken')
    const decodedToken = jwtDecode(token)
    const expirationTime = decodedToken.exp * 1000
    return Date.now() > expirationTime
}