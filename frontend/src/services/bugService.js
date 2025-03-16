import axios from "axios";

// Since your backend is already using /api/bugs
const api = axios.create({
  baseURL: "/api/bugs", // This matches your backend route
  headers: {
    "Content-Type": "application/json",
  },
});

// Fetch all bugs
export const getAllBugs = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    console.error('Error fetching bugs:', error.response?.data || error.message);
    throw error;
  }
};

// Fetch a single bug by ID
export const getBugById = async (id) => {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching bug ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

// Create a new bug
export const createBug = async (bugData) => {
  try {
    const response = await api.post('/', bugData);
    return response.data;
  } catch (error) {
    console.error('Error creating bug:', error.response?.data || error.message);
    throw error;
  }
};

// Update a bug
export const updateBug = async (id, bugData) => {
  try {
    const response = await api.put(`/${id}`, bugData);
    return response.data;
  } catch (error) {
    console.error(`Error updating bug ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

// Delete a bug
export const deleteBug = async (id) => {
  try {
    const response = await api.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting bug ${id}:`, error.response?.data || error.message);
    throw error;
  }
};