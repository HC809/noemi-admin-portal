import {AxiosResponse} from "axios";
import axiosNoTokenRequest from "./no-token-request";

const responseBody = (response: AxiosResponse) => response.data;

const axiosTokenRequests = {
  get: (url: string) => axiosNoTokenRequest.get(url).then(responseBody),
  post: (url: string, body: {}) =>
    axiosNoTokenRequest.post(url, body).then(responseBody),
  put: (url: string, body: {}) =>
    axiosNoTokenRequest.put(url, body).then(responseBody),
  del: (url: string) => axiosNoTokenRequest.delete(url).then(responseBody),
};

export {axiosTokenRequests};
