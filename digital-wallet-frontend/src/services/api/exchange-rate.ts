import { UpdateExchangeRateValueDTO } from "../../constants/dto/exchange-rate.dto";
import { Currency } from "../../constants/enum/currency.enum";
import { privateAxiosInstance } from "./RESTClient";


export const patchExchangeRateValue = async (data: UpdateExchangeRateValueDTO) => {
    return await privateAxiosInstance.patch('/exchange-rate/value', data );
}

export const getExchangeRageByBaseCurrency = async (currency: Currency) => {
    return await privateAxiosInstance.get('/exchange-rate/' + currency);
}