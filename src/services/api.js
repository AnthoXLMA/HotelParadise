import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5001/api",
  withCredentials: true,  // Important pour envoyer les credentials (cookies, auth)
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.get('/hotelier/me')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
});


export default api;


