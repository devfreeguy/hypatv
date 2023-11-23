import axios from "axios";
import queryString from "query-string";
import apiConfg from "./apiconfg";

const axiosClient = axios.create({
  baseURL: apiConfg.baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) =>
    queryString.stringify({ ...params, api_key: apiConfg.apiKey }),
});

axiosClient.interceptors.request.use(async (config) => config);

axiosClient.interceptors.request.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    throw error;
  }
);

export default axiosClient;
