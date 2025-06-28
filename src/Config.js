import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "https://closet-recruiting-api.azurewebsites.net/api", // Base URL for API
  headers: {
    "Content-Type": "application/json", // Optional: Define content type
  },
});

// Function to fetch data from the endpoint
export const fetchData = async () => {
  try {
    const response = await api.get("/data"); // Make the GET request
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error fetching data:", error.message); // Log any errors
    throw error; // Propagate the error for further handling
  }
};

// Export the Axios instance for advanced use if needed
export default api;
