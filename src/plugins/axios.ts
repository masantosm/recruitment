import axios from 'axios'
const TOKEN = 'cf3851069b6ad0c13f365cda737b71e349c2ee94a9203d07930c23009eaeafdc'

const axiosInstance = axios.create({
  baseURL: 'https://api-test.sesametime.com/recruitment/v1',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${TOKEN}`
  }
})
export default axiosInstance
