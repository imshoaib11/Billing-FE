import axios from 'axios'

const AxiosService = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers:{
        "Content-Type": "application/json "
    }
})

AxiosService.interceptors.request.use(config=>{
    let token = sessionStorage.getItem('token')
    if(token && config.authenticate)
        config.headers.Authorization = `Bearer ${token}`
    return config
}, error=>Promise.reject(error))

AxiosService.interceptors.response.use(response=>{
    return response.data
}, error=>{
    const {response} = error
    if(response.status===403){
        window.location.assign('/login')
    }
    else
        throw response.data
})

export default AxiosService