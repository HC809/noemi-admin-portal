export class IApiResponse {
  success: boolean;
  message: string;
  errors: string[];
  data: any;
  constructor(newItem: IApiResponse) {
    this.success = newItem?.success ?? null;
    this.message = newItem?.message ?? null;
    this.errors = newItem?.errors ?? null;
    this.data = newItem?.data ?? null;
  }
}
