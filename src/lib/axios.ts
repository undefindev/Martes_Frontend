import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

export default api


/* la 'urlbase'  esta es la mejor opcion en caso de que cambie el servidor solo se hace un cambio a futuro */