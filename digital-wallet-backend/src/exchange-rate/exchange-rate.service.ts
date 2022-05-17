import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Currency } from './enums/currency.enum';
import { ExchangeRate } from './exchange-rate.entity';

@Injectable()
export class ExchangeRateService {
  constructor(
    @InjectRepository(ExchangeRate)
    private readonly exchangeRateRepository: Repository<ExchangeRate>,
  ) {}

  async create() {}

  async update() {}

  async getBaseCurrencyRates(baseCurrency: Currency) {
    const rates = await this.exchangeRateRepository.find({
      where: {
        baseCurrency,
      },
    });
    console.log(rates)
    return rates;
  }
}
