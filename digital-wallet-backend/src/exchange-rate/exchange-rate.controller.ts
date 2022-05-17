import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from 'src/core/decorators/public.decorator';
import { CreateExchangeRateDTO } from './dto/create-exchange-rate.dto';
import { UpdateExchangeRateDTO } from './dto/update-exchange-rate.dto';
import { ExchangeRate } from './entities/exchange-rate.entity';
import { Currency } from './enums/currency.enum';
import { ExchangeRateService } from './exchange-rate.service';

@ApiTags('Exchange Rates')
@ApiBearerAuth()
@Controller('exchange-rate')
export class ExchangeRateController {
  constructor(private readonly exchangeRateService: ExchangeRateService) {}

  @Post('create')
  @HttpCode(201)
  @ApiOperation({ summary: 'Create exchange rate' })
  @ApiResponse({ type: ExchangeRate })
  async create(@Body() body: CreateExchangeRateDTO) {
    return await this.exchangeRateService.create(body);
  }

  @Patch('value')
  @HttpCode(200)
  @ApiOperation({ summary: 'Update exchange rate value' })
  @ApiResponse({ type: ExchangeRate })
  async updateValue(@Body() body: UpdateExchangeRateDTO) {
    return await this.exchangeRateService.update(body);
  }

  @Get(':base_currency')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get each record with base currency passed as parameter' })
  @ApiResponse({ isArray: true, type: ExchangeRate })
  async profile(@Param('base_currency') currency: Currency) {
    return await this.exchangeRateService.getBaseCurrencyRates(currency);
  }
}
