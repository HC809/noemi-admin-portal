export type LoginModel = {
  email: string;
  password: string;
};

export interface LoginResponseModel {
  email: string;
  token: string;
}

export interface LoggedInModel {
  email: string | null;
  token: string | null;
  logged: boolean;
}
