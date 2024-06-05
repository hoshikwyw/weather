import axios from 'axios'
import { apiKey } from '../constants'

const forecastEndpoint = params => `api.openweathermap.org/data/2.5/forecast/daily?q=${params.city}&cnt=${params.day}&appid=${apiKey}`
const locationEndpoint = params => `https://api.openweathermap.org/data/2.5/weather?q=${params.city}&appid=${apiKey}`

const apiCall = async (endpoint) => {
    const options = {
        method: 'GET',
        url: endpoint
    }
    try {
        const response = await axios.request(options)
        console.log(response.data);
        return response.data;
    } catch (err) {
        console.log('error : ', err);
        return null
    }
}

export const fetchWeatherForecast = params => {
    return apiCall(forecastEndpoint(params))
}

export const fetchLocation = params => {
    return apiCall(locationEndpoint(params))
}
