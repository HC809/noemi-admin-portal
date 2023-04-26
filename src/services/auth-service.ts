import {ILoginModel, ILoginResponseModel} from "../models/auth/Login";
import noTokenRequest from "./api/no-token-request";

const AuthAPIService = {
  authenticate: (body: ILoginModel): Promise<ILoginResponseModel> =>
    noTokenRequest.post("/account/authenticate", body),
};

export {AuthAPIService};
