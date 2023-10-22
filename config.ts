import axios from "axios";

const httpClient = axios.create({
  baseURL: 'http://10.0.2.2:8080/',
  timeout: 30000
});

httpClient.interceptors.request.use(request => {
  console.log("*** HTTP REQUEST ****", request.baseURL, request.url, JSON.stringify(request.data), JSON.stringify(request.params))
  return request
})

export default httpClient