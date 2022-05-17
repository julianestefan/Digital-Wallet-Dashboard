import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

import { Currency } from './enums/currency.enum';

@Entity('exchange_rates')
export class ExchangeRate {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({
    name: 'base_currency',
    enum: Currency,
    default: Currency.ETH,
  })
  @ApiProperty()
  baseCurrency: Currency;

  @Column({
    name: 'converted_currency',
    enum: Currency,
  })
  convertedCurrency: Currency;

  @Column({
    unsigned: true,
    type: 'decimal',
    precision: 15,
  })
  value: number;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty()
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at' })
  @ApiProperty()
  updatedAt: Date;
}
