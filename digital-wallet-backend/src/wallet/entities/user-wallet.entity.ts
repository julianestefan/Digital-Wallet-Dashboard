import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Unique,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Wallet } from './wallet.entity';

@Entity('user_wallets')
@Unique('user_wallet_id', ['walletId', 'userId'])
export class UserWallet {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ApiProperty()
  @Column({ name: 'wallet_id' })
  walletId: number;

  @ApiProperty()
  @ManyToOne((tpye) => Wallet, { cascade: true })
  @JoinColumn({ name: 'wallet_id' })
  wallet: Wallet;

  @Column({ name: 'user_id' })
  @ApiProperty()
  userId: number;

  @ManyToOne((tpye) => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'is_favorite', default: false })
  @ApiProperty()
  isFavorite: boolean;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty()
  createdAt: Date;
}
