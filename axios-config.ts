import axios from "axios";
import Constants from 'expo-constants';
import store from "./store/store";
import { convertUtcDateTimeToLocalDateTime } from "./core/utils";
import { setAccessToken } from "./store/features/session/session-slice";

const httpClient = axios.create({
  baseURL: `http://${Constants.expoConfig?.hostUri?.split(':')[0]}:8080/`,
  timeout: 30000
});

let refreshTokenPromise: Promise<any> | undefined;

const refreshAccessToken = () => {
  if (!refreshTokenPromise) {
    const session = store.getState().session;
    const authObj = {
      userId: session.userId,
      deviceType: "MOBILE",
      refreshToken: session.session.refreshToken,
      deviceId: session.session.deviceId
    }
    refreshTokenPromise = httpClient.post('user/token', authObj).then(response => {
      store.dispatch(setAccessToken({
        accessToken: response.data.token,
        accessTokenExpiry: response.data.tokenExpiry
      }))
    })
  }
  return refreshTokenPromise;
}

const getExpiryTimeToCheck = () => convertUtcDateTimeToLocalDateTime(new Date().toISOString()).getTime() - (30 * 1000);

const authInterceptor = async (request: any) => {
  console.log("*** HTTP REQUEST ****", request.baseURL, request.url, JSON.stringify(request.params))

  if (request.url === 'user/authenticate' || request.url === 'user/token') {
    return request;
  }

  let session = store.getState().session;
  let accessToken = session.accessToken;
  if (getExpiryTimeToCheck() >= session.accessTokenExpiry?.getTime()!) {
    console.log("Token Expired. Refreshing")
    await refreshAccessToken();
    session = store.getState().session;
    accessToken = session.accessToken;
  }

  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`
  }
  return request
};

httpClient.interceptors.request.use(authInterceptor)
export default httpClient