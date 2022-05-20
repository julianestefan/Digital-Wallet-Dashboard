import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Index,
  Unique,
} from 'typeorm';

import { Currency } from '../enums/currency.enum';

@Entity('exchange_rates')
@Unique('rate_currencies', ['baseCurrency', 'convertedCurrency'])
export class ExchangeRate {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ApiProperty({
    name: 'base_currency',
    enum: Currency,
    enumName: 'Currencies',
    default: Currency.ETH
  })
  @Column({
    name: 'base_currency',
    enum: Currency,
    enumName: 'Currencies',
    default: Currency.ETH,
  })
  @Index()
  baseCurrency: Currency;

  @ApiProperty({
    name: 'converted_currency',
    enum: Currency,
    enumName: 'Currencies',
  })
  @Column({
    name: 'converted_currency',
    enum: Currency,
    enumName: 'Currencies',
  })
  convertedCurrency: Currency;

  @Column({
    unsigned: true,
    type: 'decimal',
    precision: 15,
  })
  @ApiProperty()
  value: number;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty()
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at' })
  @ApiProperty()
  updatedAt: Date;
}
