import { Currency } from "../enum/currency.enum";

export interface UpdateExchangeRateValueDTO {
    id: number;
    value: number;
}

export interface ExchangeRate {
    baseCurrency: Currency
    convertedCurrency: Currency
    id: number
    updatedAt: Date
    createdAt: Date
    value: number
}