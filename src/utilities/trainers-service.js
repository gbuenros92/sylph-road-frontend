import axios from 'axios'

// const BASE_URL = "https://the-sylph-road.herokuapp.com/api/v1/trainers"
const BASE_URL = "http://localhost:8080/api/v1/trainers"


export const signUp = async newTrainer => {
    try {
        const token = await axios.post(`${BASE_URL}/signup`, newTrainer)
        localStorage.setItem('token', token.data)
        return token
    } catch (e) {
        console.log(e)
    }
}

export const login = async credentials => {
    try {
        const token = await axios.post(`${BASE_URL}/login`, credentials)

        localStorage.setItem('token', token.data)

        return getTrainer()
    } catch (e) {
        console.log(e)
    }
}

const setOptions = () => {
    return {headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
    }}
}

export const updateTrainer = async newTrainerDetails => {
    try {
        const updatedTrainer = await axios.put(`${BASE_URL}/${newTrainerDetails._id}`, newTrainerDetails, setOptions())
        return updatedTrainer
    } catch (e) {
        console.log(e)
    }
}

export const getToken = () => {
    const token = localStorage.getItem('token')
    if (!token) return null

    const payload = JSON.parse(atob(token.split('.')[1]))

    if(payload.exp * 1000 < Date.now()) {
        localStorage.removeItem('token')
        return null
    }

    return token
}

export const getTrainer = () => {
    const token = getToken()
    return token ? JSON.parse(atob(token.split('.')[1])).trainer : null
}

export const logOut = () => {
    localStorage.removeItem('token')
}