import axios from 'axios'
import { BASE_URL } from '../util/constant'

export const subscribeGreenhouseData = (greenhouseId, onMessage, onError) => {
    const eventSource = new EventSource(`${BASE_URL}/sse/data?greenhouse=${greenhouseId}`)

    eventSource.onmessage = (event) => {
        const parsedData = JSON.parse(event.data)
        onMessage(parsedData) // Gọi callback để cập nhật dữ liệu
    }

    eventSource.onerror = (error) => {
        console.error('SSE connection error:', error)
        eventSource.close()
        onError?.(error)
    }

    return eventSource // Trả về EventSource để có thể đóng kết nối khi cần
}

// Fetch devices from API
export const fetchDevices = async (pageNum) => {
    try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`${BASE_URL}/devices/getControllers`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
            greenhouseId: 1,
            limit: 5,
            pageOffset: pageNum
            }
        })
      return response.data
    } catch (error) {
      console.error('Error fetching devices:', error)
    }
  };

  export const sendDataToDevice = async (deviceId, status, value, userId) => {
    try {
        const token = localStorage.getItem('token')
        const response = await axios.post(`${BASE_URL}/devices/sendData`, {
            deviceId,
            status,
            value,
            userId
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        return response.data
    } catch (error) {
        console.error('Error sending data to device:', error.response ? error.response.data : error.message)
    }
}
