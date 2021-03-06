import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsPositive } from 'class-validator';
import { Currency } from '../enums/currency.enum';

export class CreateExchangeRateDTO {
  @ApiProperty({ enum: Currency, enumName: 'Currencies' })
  @IsEnum(Currency)
  convertedCurrency: Currency;

  @ApiProperty()
  @IsPositive()
  value: number;
}
