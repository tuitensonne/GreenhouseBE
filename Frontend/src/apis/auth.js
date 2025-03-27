import axios from 'axios'

import { BASE_URL } from '../util/constant'

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/signin`, {
      email,
      password
    })

    return response.data
  } catch (error) {
    console.error('Login failed:', error.response?.data?.message || error.message)
    throw new Error(error.response?.data?.message || 'Login failed')
  }
};

export const signup = async (username, email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/signup`, {
      username,
      email,
      password
    })

    return response.data
  } catch {
    console.error('Signup failed:', error.response?.data?.message || error.message)
    throw new Error(error.response?.data?.message || 'Signup failed')
  }
}