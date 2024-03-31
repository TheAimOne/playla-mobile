import axios from "axios";
import Constants from 'expo-constants';

const httpClient = axios.create({
  baseURL: `http://${Constants.expoConfig?.hostUri?.split(':')[0]}:8080/`,
  timeout: 30000
});

httpClient.interceptors.request.use(request => {
  console.log("*** HTTP REQUEST ****", request.baseURL, request.url, JSON.stringify(request.data), JSON.stringify(request.params))
  return request
})

export default httpClient