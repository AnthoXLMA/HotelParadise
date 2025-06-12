import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,  // <=== Important pour envoyer les credentials (cookies, auth)
});
