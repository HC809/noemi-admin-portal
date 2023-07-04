import axios from "axios";
const noAuthRequest = axios.create();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
noAuthRequest.defaults.baseURL = process.env.NEXT_PUBLIC_NOEMI_API_URL;

noAuthRequest.interceptors.response.use(
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
        //console.log(error.response.data);
        //console.log(error.response.status);
        //console.log(error.response.headers);
        const errorMessage =
          (error.response && (error.response.data as string)) ||
          "Error desconocido.";
        return Promise.reject(errorMessage);
      }
    } else {
      console.log("No Axios Error:", error);
      return Promise.reject(error);
    }

    // if (axioError.response?.status === 401) {
    //   alert("No Autorizado");
    // }
  }
);

export default noAuthRequest;
