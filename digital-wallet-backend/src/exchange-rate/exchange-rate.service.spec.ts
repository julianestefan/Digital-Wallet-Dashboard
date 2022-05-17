import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { ExchangeRate } from './exchange-rate.entity';
import { ExchangeRateService } from './exchange-rate.service';
import {Currency} from './enums/currency.enum';

describe('ExchangeRateService', () => {
  let service: ExchangeRateService;

  const mockedExchangeRates = [
    {
      id: 1,
      baseCurrency: Currency.ETH,
      convertedCurrency: Currency.USD,
      value: 2000,
      createAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      baseCurrency: Currency.ETH,
      convertedCurrency: Currency.EUR,
      value: 1980,
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
});
