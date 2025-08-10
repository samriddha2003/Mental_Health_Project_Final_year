// src/services/api.js
import axios from 'axios';
import allStore from '../stores/allStore';

const API_BASE_URL = 'http://127.0.0.1:8000'
//https://mentalhealthchatbotbackend.onrender.com';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// Function to handle post API call
export const postApi = async (url,values) => {
    const response = await axiosInstance.post(url, values);
   
    return response;
};

export const questionarrieApi= async(url,quesionarrie) =>{
  const response = await axiosInstance.post(url, {questions: quesionarrie });
  return response;
}

export const chatBotApi= async(url,messages) =>{
  const response = await axiosInstance.post(url, {prompt: messages?.content });
  return response;
}

export const loginApi= async(url,values)=>
{
  debugger
   const response = await axiosInstance.post(url, values);
   const access_token = response?.data?.access_token;
    if (access_token) {
    localStorage.setItem('authToken', access_token);
    return true;
  }
  return false;
}

export const doctorListApi = async(url) =>{
  const response = await axiosInstance.get(url);
  return response;
}

//  const headers = {
//     Authorization: `Bearer ${token}`,
//   }
//   try {
//     const response = await axiosInstance.get('/user/profile', { headers });
//     return response.data;
//   } catch 

export const getApi = async(url,values)=>{
  const response= await axiosInstance.get(url,values)
  return response;
}