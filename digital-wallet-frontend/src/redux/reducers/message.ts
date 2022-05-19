import { LoadingDispatchTypes, Snackbar } from '../actions/message/types';
import { SET_MESSAGE, RESET_MESSAGE } from '../types/message';

type MessageState = Snackbar | null

const initialState: Snackbar | null = null;

export function messageReducer(
    state: MessageState = initialState,
    action: LoadingDispatchTypes
) {
    switch (action.type) {
        case SET_MESSAGE: return action.payload;
        case RESET_MESSAGE: return null;
        default: return state;
    }
}
