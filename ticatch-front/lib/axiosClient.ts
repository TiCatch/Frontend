import axios from "axios";

const axiosClient = axios.create({
  baseURL: `http://13.54.208.249:8080`,
  withCredentials: true,
});

export default axiosClient;
