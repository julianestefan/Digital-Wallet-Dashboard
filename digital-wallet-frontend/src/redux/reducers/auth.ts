import { User } from "../../constants/dto/user.dto";
import { AuthDispatchTypes } from "../actions/auth/types";
import { AuthType } from "../types";

export interface AuthState {
  token?: string;
  user?: User;
}

const initialState: AuthState = {
  token: undefined,
  user: undefined,
};

export function authReducer(
  state: AuthState = initialState,
  action: AuthDispatchTypes
) {
  switch (action.type) {
    case AuthType.LOGIN: return action.payload;
    case AuthType.GET_PROFILE: return { ...state, user: action.payload };
    case AuthType.LOGOUT: return initialState;
    default: return state;
  }
}
