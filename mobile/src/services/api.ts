import axios from 'axios'

const api = axios.create({
    baseURL: 'http://192.168.0.108:3333'
    // 192.168.0.108 é o IP do servidor da api (no caso, meu notebook) na rede
})

export default api