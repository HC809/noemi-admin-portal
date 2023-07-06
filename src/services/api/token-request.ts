import axios from "axios";
import {getToken} from "next-auth/jwt";
import {getSession} from "next-auth/react";

const authRequest = axios.create();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
authRequest.defaults.baseURL = process.env.NEXT_PUBLIC_NOEMI_API_URL;

const axiosDefaultHeaders = (token: string) => {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };
};

authRequest.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    if (session) {
      const {accessToken} = session;
      config.headers = axiosDefaultHeaders(accessToken || "");
    }

    return config;
  },
  (error) => {
    console.log(`Request Interceptor: ${error}`);
    Promise.reject(error);
  }
);

authRequest.interceptors.response.use(
  (response) => {
    const {data} = response || {};
    return data;
  },
  async function (error) {
    if (axios.isAxiosError(error)) {
      if (!error.response) {
        return Promise.reject(
          "Error de conexión. Por favor, ponte en contacto con el administrador del sistema para informar sobre este problema."
        );
      } else {
        const errorMessage =
          (error.response && (error.response.data as string)) ||
          "Error desconocido.";
        return Promise.reject(errorMessage);
      }
    } else {
      console.log("No Axios Error:", error);
      return Promise.reject(error);
    }
  }
);

export default authRequest;
