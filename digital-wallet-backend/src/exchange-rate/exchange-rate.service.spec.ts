import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { ExchangeRate } from './entities/exchange-rate.entity';
import { ExchangeRateService } from './exchange-rate.service';
import { Currency } from './enums/currency.enum';
import { DeepPartial } from 'typeorm';
import { UpdateExchangeRateDTO } from './dto/update-exchange-rate.dto';
import { CreateExchangeRateDTO } from './dto/create-exchange-rate.dto';
import { NotFoundException, Options } from '@nestjs/common';

describe('ExchangeRateService', () => {
  let service: ExchangeRateService;

  const newRate: CreateExchangeRateDTO = {
    convertedCurrency: Currency.EUR,
    value: 1980,
  };

  const updateRate: UpdateExchangeRateDTO = {
    id: 1,
    value: 2500,
  };

  const wrongUpdateRate: UpdateExchangeRateDTO = {
    id: 2,
    value: 2500,
  };

  const mockedExchangeRates = [
    {
      id: 1,
      baseCurrency: Currency.ETH,
      convertedCurrency: Currency.USD,
      value: 2000,
      createAt: new Date(),
      updatedAt: new Date(),
    },
  ].map((rate) => plainToClass(ExchangeRate, rate));

  const mockedRepo = {
    find: jest.fn((option: { where: { baseCurrency: Currency } }) =>
      Promise.resolve(
        mockedExchangeRates.filter(
          (rate) => rate.baseCurrency === option.where.baseCurrency,
        ),
      ),
    ),
    save: jest.fn((data: DeepPartial<ExchangeRate>) => {
      const rate = plainToClass(ExchangeRate, data);

      rate.id = rate.id ? rate.id : 2;
      rate.baseCurrency = rate.baseCurrency ? rate.baseCurrency : Currency.ETH;

      return Promise.resolve(rate);
    }),
    findOne: jest.fn((options: { where: { id: number } }) =>
      mockedExchangeRates.find((rate) => rate.id === options.where.id),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExchangeRateService,
        {
          provide: getRepositoryToken(ExchangeRate),
          useValue: mockedRepo,
        },
      ],
    }).compile();

    service = module.get<ExchangeRateService>(ExchangeRateService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return base currency exchange rates', async () => {
    const result = await service.getBaseCurrencyRates(Currency.ETH);

    expect(mockedRepo.find).toHaveBeenCalled();

    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBe(mockedExchangeRates.length);
  });

  it('should return an empty array if the asociated currency is not present ', async () => {
    const result = await service.getBaseCurrencyRates(Currency.USD);

    expect(mockedRepo.find).toHaveBeenCalled();

    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBe(0);
  });

  it('should return an empty array if the asociated currency is not present ', async () => {
    const result = await service.create(newRate);

    expect(mockedRepo.save).toHaveBeenCalled();

    expect(result).toBeInstanceOf(ExchangeRate);

    expect(result.baseCurrency).toBe(Currency.ETH);
  });

  it('should call save and updatee the value ', async () => {
    const result = await service.update(updateRate);

    expect(mockedRepo.save).toHaveBeenCalled();
    expect(result.value).toBe(updateRate.value);
  });

  it('should throw an aception if wrong id is provided', async () => {
    await expect(service.update(wrongUpdateRate)).rejects.toThrow(
      NotFoundException,
    );
  });
});
