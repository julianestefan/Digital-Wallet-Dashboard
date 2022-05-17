import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateExchangeRateDTO } from './dto/create-exchange-rate.dto';
import { UpdateExchangeRateDTO } from './dto/update-exchange-rate.dto';
import { Currency } from './enums/currency.enum';
import { ExchangeRate } from './entities/exchange-rate.entity';

@Injectable()
export class ExchangeRateService {
  constructor(
    @InjectRepository(ExchangeRate)
    private readonly exchangeRateRepository: Repository<ExchangeRate>,
  ) {}

  async create( data: CreateExchangeRateDTO) {
      const rate = (await this.exchangeRateRepository.save(data)) as ExchangeRate

      return rate;
  }

  async update(data: UpdateExchangeRateDTO) {
    const rate = await this.exchangeRateRepository.findOne({
      where: {id: data.id}
    });

    if(!rate) throw new NotFoundException("Exchange rate does not exist") 

    rate.value = data.value;

    return await this.exchangeRateRepository.save(rate);
  }

  async getBaseCurrencyRates(baseCurrency: Currency) {
    const rates = await this.exchangeRateRepository.find({
      where: {
        baseCurrency,
      },
    });

    return rates;
  }
}
