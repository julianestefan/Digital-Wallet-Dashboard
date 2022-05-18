import { ApiProperty } from '@nestjs/swagger';
import { IsEthereumAddress } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Index,
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
  @IsEthereumAddress()
  @Column({ type: 'float', name: 'eth_balance', unsigned: true })
  ethBalance: number;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty()
  createdAt: Date;
}
