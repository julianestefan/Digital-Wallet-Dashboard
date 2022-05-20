import { useCallback } from "react";
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

import { endLoading, startLoading } from "../../redux/actions/loading/loading"
import { setMessage } from "../../redux/actions/message";

const defaultErrorCalback = (dispatch: Dispatch, message = "Ha ocurrido un error") => {
    dispatch(setMessage({ message }, "error"))
}

const defaultFinallyCallback = () => null;

export const useGlobalLoader = (
    callback: (dispatch: Dispatch , ...params : any[]) => any,
    errorCallback = defaultErrorCalback,
    finallyCallback = defaultFinallyCallback
) => {
    const dispatch = useDispatch();

    return useCallback(async (...params: any[]) => {
        dispatch(startLoading())
        try {
            callback(dispatch, ...params);
        } catch (error) {
            errorCallback(dispatch);
        } finally {
            finallyCallback();
            dispatch(endLoading());
        }
    }, [callback, errorCallback, finallyCallback, dispatch])
}

