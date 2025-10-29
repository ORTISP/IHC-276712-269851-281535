const API_BASE_URL = 'http://10.0.2.2:3000/api';

class ApiService {
  static async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;

    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const config = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);

      // Handle network errors
      if (!response) {
        throw new Error('Network request failed. Please check your connection.');
      }

      let data;
      try {
        const text = await response.text();
        data = text ? JSON.parse(text) : {};
      } catch (parseError) {
        // If response is not JSON, create a generic error
        throw new Error(`Server error (${response.status}): ${response.statusText}`);
      }

      if (!response.ok) {
        // Create error with details from backend - structure it like axios
        const error = new Error(data.error || data.message || `HTTP error! status: ${response.status}`);
        error.status = response.status;
        error.details = data.details || [];
        error.response = {
          data: data,
          status: response.status,
          statusText: response.statusText,
        };
        error.message = data.error || data.message || error.message;
        throw error;
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      
      // Handle network errors specifically
      if (error.message === 'Network request failed' || error.message.includes('Network')) {
        throw new Error('Error de conexión. Por favor verifica que el servidor esté corriendo.');
      }
      
      // If error already has a message from backend, keep it
      if (error.message && !error.message.includes('HTTP error')) {
        throw error;
      }
      
      // Otherwise, throw with a generic message
      throw new Error(error.message || 'Error al procesar la solicitud');
    }
  }

  static async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  static async get(endpoint) {
    return this.request(endpoint, {
      method: 'GET',
    });
  }

  static async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  static async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE',
    });
  }
}

export default ApiService;
