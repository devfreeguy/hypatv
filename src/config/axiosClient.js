import axios from "axios";
import queryString from "query-string";
import { apiConfig, fileApiConfig } from "./apiconfg";

export const dbClient = axios.create({
  baseURL: apiConfig.baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) =>
    queryString.stringify({
      api_key: apiConfig.apiKey,
      ...params,
    }),
});

dbClient.interceptors.request.use(async (config) => config);

dbClient.interceptors.request.use(
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

// export default dbAxiosClient;

export const filesClient = axios.create({
  baseURL: fileApiConfig.baseUrl,
  headers: {
    "Content-Type": "application/json",
    "X-RapidAPI-Key": fileApiConfig.apiKey,
    "X-RapidAPI-Host": "filepursuit.p.rapidapi.com",
  },
  paramsSerializer: (params) =>
    queryString.stringify({ ...params, type: "video" }),
});

filesClient.interceptors.request.use(async (config) => config);

filesClient.interceptors.request.use(
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
