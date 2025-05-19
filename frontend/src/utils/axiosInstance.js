import axios from "axios";

const axiosInstance = axios.create({ baseURL: "http://localhost:3000" });

// Response interceptor for handling errors
axiosInstance.interceptors.response.use(
  (response) => {
    // Any status code within 2xx range
    return response;
  },
  (error) => {
    let errorMessage = "An unexpected error occurred";
    
    if (error.response) {
      // The server responded with a status code outside of 2xx
      const { status, data } = error.response;
      
      switch (status) {
        case 400:
          errorMessage = data.message || "Bad request";
          break;
        case 401:
          errorMessage = "Unauthorized - Please login again";
          // You could trigger a logout or redirect to login here
          break;
        case 403:
          errorMessage = "Forbidden - You don't have permission";
          break;
        case 404:
          errorMessage = "Resource not found";
          break;
        case 429:
          errorMessage = "Too many requests - Please try again later";
          break;
        case 500:
          errorMessage = "Server error - Please try again later";
          break;
        default:
          errorMessage = data.message || `Error ${status}: Something went wrong`;
      }
    } else if (error.request) {
      // The request was made but no response was received
      errorMessage = "No response from server - Please check your connection";
    } else {
      // Something happened in setting up the request
      errorMessage = error.message;
    }
    
    // You can log errors to a monitoring service here
    console.error("API Error:", errorMessage, error);
    
    // Attach the formatted message to the error object
    error.formattedMessage = errorMessage;
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
