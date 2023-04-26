export type ILoginModel = {
  email: string;
  password: string;
};

export interface ILoginResponseModel {
  email: string;
  token: string;
}
