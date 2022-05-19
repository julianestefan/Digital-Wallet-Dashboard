import { SnackbarProps } from "@mui/material";
import { AlertColor } from "@mui/material";
import { SET_MESSAGE, RESET_MESSAGE } from "../../types/message";

export interface Snackbar {
  snackbarProps: SnackbarProps;
  messagetype?: AlertColor;
  action: string;
}

export interface IactionSetMessage {
  type: typeof SET_MESSAGE;
  payload: Snackbar;
}

export interface IactionResetMessage {
  type: typeof RESET_MESSAGE;
}

export type LoadingDispatchTypes = IactionSetMessage | IactionResetMessage;
