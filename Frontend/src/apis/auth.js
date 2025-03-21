import axios from 'axios';

const API_URL = 'http://localhost:8088/auth';

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/signin`, {
      email,
      password
    })

    return response.data
  } catch (error) {
    console.error('Login failed:', error.response?.data?.message || error.message)
    throw new Error(error.response?.data?.message || 'Login failed')
  }
};