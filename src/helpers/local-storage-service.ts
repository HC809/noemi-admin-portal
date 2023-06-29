import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import {LoggedInModel} from "../models/auth/login-model";
import {AUTH_USER} from "./constants/general";

const initAuthState: LoggedInModel = {
  email: null,
  token: null,
  logged: false,
};

const getAuthUser = (): LoggedInModel => {
  const encryptedAuth = Cookies.get(AUTH_USER);
  if (!encryptedAuth) return initAuthState;

  const bytes = CryptoJS.AES.decrypt(
    encryptedAuth,
    process.env.REACT_APP_CRYPTO_SALT || ""
  );

  try {
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch {
    return initAuthState;
  }
};

const setAuthUser = (auth: LoggedInModel): void => {
  const encryptedAuth = CryptoJS.AES.encrypt(
    JSON.stringify(auth),
    process.env.REACT_APP_CRYPTO_SALT || ""
  ).toString();

  Cookies.set(AUTH_USER, encryptedAuth);
};

const removeAuthUser = (): void => {
  Cookies.remove(AUTH_USER);
};

export {setAuthUser, getAuthUser, removeAuthUser};
