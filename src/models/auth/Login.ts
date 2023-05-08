export type ILoginModel = {
  email: string;
  password: string;
};

export interface ILoginResponseModel {
  email: string;
  token: string;
}

export interface ILoggedInModel {
  email: string | null;
  token: string | null;
  logged: boolean;
}
