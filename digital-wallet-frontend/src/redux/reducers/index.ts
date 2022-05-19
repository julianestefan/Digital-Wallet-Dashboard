import { combineReducers } from "redux";
import { authReducer } from "./auth";
import { loadingReducer } from "./loader";
import { messageReducer } from './message'

const RootReducer = combineReducers({
    auth: authReducer,
    loader: loadingReducer,
    snackbar: messageReducer
});

export default RootReducer