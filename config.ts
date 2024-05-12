import axios from "axios";
import Constants from 'expo-constants';
import store from "./store/store";

const httpClient = axios.create({
  baseURL: `http://${Constants.expoConfig?.hostUri?.split(':')[0]}:8080/`,
  timeout: 30000
});

httpClient.interceptors.request.use(request => {
  console.log("*** HTTP REQUEST ****", request.baseURL, request.url, JSON.stringify(request.data), JSON.stringify(request.params))
  const accessToken = store.getState().session.accessToken;
  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`
  }
  return request
})

export default httpClient