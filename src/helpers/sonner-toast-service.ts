import {toast} from "sonner";
import {IApiResponse} from "../models/shared/api-response";

export enum DefaultTitles {
  MainApp = "Noemi",
}

export enum DefaultMessages {
  Delete = `¿Estás seguro(a) que deseas eliminar este registro "@param"?`,
}

export enum AlertType {
  default = "default",
  error = "error",
  warning = "warning",
  success = "success",
  question = "question",
}

export enum AlertPosition {
  topLeft = "top-left",
  topCenter = "top-center",
  topRight = "top-right",
  bottomLeft = "bottom-left",
  bottomCenter = "bottom-center",
  bottomRight = "bottom-right",
}

export class AlertButtons {
  yesText: string;
  noText: string;
  constructor(newItem?: AlertButtons) {
    this.yesText = newItem?.yesText ?? "Sí";
    this.noText = newItem?.yesText ?? "No";
  }
}

const sonnerAlert = (
  message: string,
  type: AlertType,
  position: AlertPosition = AlertPosition.topRight
) => {
  switch (type) {
    case AlertType.success:
      toast.success(message, {
        
      });
      break;

    case AlertType.error:
      toast.error(message);
      break;

    default:
      toast(message);
      break;
  }
};

const alertFromAPIResponse = (
  response: IApiResponse,
  customPosition?: AlertPosition
) => {
  if (response?.message) {
    const type = response?.success ? AlertType.success : AlertType.error;
    if (!response?.success) {
    } else {
    }
  }
};

export {sonnerAlert, alertFromAPIResponse};
