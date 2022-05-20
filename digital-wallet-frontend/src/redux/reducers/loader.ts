import {LoadingDispatchTypes} from '../actions/loading/types';
import {LoadingType} from '../types/loading';

export interface LoadingState {
	loading: boolean;
}

const initialState: LoadingState = {
	loading: false,
};

export function loadingReducer(
	state: LoadingState = initialState,
	action: LoadingDispatchTypes
) {
	switch (action.type) {
		case LoadingType.START_LOADING:
			return {loading: true};
		case LoadingType.END_LOADING:
			return {loading: false};

		default:
			return state;
	}
}
