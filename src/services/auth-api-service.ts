import {LoginModel, LoginResponseModel} from "../models/auth/login-model";
import noTokenRequest from "./api/no-token-request";

const AuthAPIService = {
  authenticate: (body: LoginModel): Promise<LoginResponseModel> =>
    noTokenRequest.post("/account/authenticate", body),
};

export {AuthAPIService};
