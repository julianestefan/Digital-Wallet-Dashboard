import {LoadingType} from '../../types/loading'
import { LoadingState } from '../../reducers/loader'

export interface IactionStartLoading {
	type: typeof LoadingType.START_LOADING;
	payload: LoadingState;
}

export interface IactionEndLoading {
	type: typeof LoadingType.END_LOADING;
	payload: LoadingState;
}

export type LoadingDispatchTypes =
	| IactionStartLoading
	| IactionEndLoading
	
