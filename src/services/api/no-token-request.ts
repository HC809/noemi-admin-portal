import axios, {AxiosError} from "axios";

const noTokenRequest = axios.create();
noTokenRequest.defaults.baseURL = process.env.NEXT_PUBLIC_NOEMI_API_URL;

noTokenRequest.interceptors.response.use(
  (response) => {
    const {data} = response || {};
    alert(data);
    return response;
  },
  async function (error: AxiosError) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        (error.response && (error.response.data as string)) ||
        "Error desconocido.";

      return Promise.reject(errorMessage);
    } else {
      return Promise.reject(error);
    }
    // if (axioError.response?.status === 401) {
    //   alert("No Autorizado");
    // }
  }
);

export default noTokenRequest;
