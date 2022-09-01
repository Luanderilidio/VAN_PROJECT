import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_BACK_END_URL}`,
  timeout: 5000,
});

export default api;
