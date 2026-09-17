const API_BASE_URL = "http://127.0.0.1:8000/api"

const apiRequest = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  })

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`)
  }

  return response.json()
}

export const getCrops = async () => {
  return apiRequest("/crops")
}

export const healthCheck = async () => {
  return apiRequest("/health")
}