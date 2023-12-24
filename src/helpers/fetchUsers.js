import axios from 'axios';

const BASE_URL = 'https://frontend-test-assignment-api.abz.agency/api/v1';

export const getToken = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/token`);
    return response.data.token;
  } catch (error) {
    console.error('Error fetching token:', error);
    throw new Error('Failed to fetch token');
  }
};

export const getUsers = async (page = 1, count = 6) => {
  try {
    const response = await axios.get(`${BASE_URL}/users?page=${page}&count=${count}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Failed to fetch users');
  }
};

export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('Failed to fetch user');
  }
};

export const createUser = async (userData) => {
  try {
    const formData = new FormData();
    formData.append('position_id', userData.position_id);
    formData.append('name', userData.name);
    formData.append('email', userData.email);
    formData.append('phone', userData.phone);
    formData.append('photo', userData.photo);

    const response = await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users', {
      method: 'POST',
      body: formData,
      headers: {
        'Token': userData.token
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};

export const getPositions = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/positions`);
    return response.data;
  } catch (error) {
    console.error('Error fetching positions:', error);
    throw new Error('Failed to fetch positions');
  }
};
