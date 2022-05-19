import { ApiProperty } from '@nestjs/swagger';
import { IsEthereumAddress } from 'class-validator';
import * as moment from 'moment';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Index,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

@Entity('wallets')
export class Wallet {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ApiProperty()
  @IsEthereumAddress()
  @Column({ unique: true })
  @Index()
  address: string;

  @ApiProperty()
  @Column({name: 'first_transaction_date'})
  firstTransactionDate: Date;

  @ApiProperty()
  @Column({name: 'is_old'})
  isOld: boolean;

  @ApiProperty()
  @IsEthereumAddress()
  @Column({ type: 'float', name: 'eth_balance', unsigned: true })
  ethBalance: number;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty()
  createdAt: Date;

  @BeforeInsert()
  @BeforeUpdate() 
  checkIifIsOldWallet() {
    const yearBeforeMoment = moment().subtract(1, 'years');
    const firstTransactionMomemnt = moment(this.firstTransactionDate);

    this.isOld = firstTransactionMomemnt.isBefore(yearBeforeMoment);
  }
}
