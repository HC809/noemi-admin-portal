import {LoginModel, LoginResponseModel} from "../models/auth/login-model";
import noAuthRequest from "./api/no-token-request";
import authRequest from "./api/token-request";

const AuthAPIService = {
  authenticate: (body: LoginModel): Promise<LoginResponseModel> =>
    noAuthRequest.post("/account/authenticate", body),
  testAuth: (): Promise<string> => authRequest.get("/account/testAuthorize"),
};

export {AuthAPIService};
