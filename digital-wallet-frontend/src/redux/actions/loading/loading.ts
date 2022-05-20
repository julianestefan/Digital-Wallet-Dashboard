import { LoadingType } from "../../types/loading"


export const  startLoading = () => ({type: LoadingType.START_LOADING })

export const  endLoading = () => ({type: LoadingType.END_LOADING })