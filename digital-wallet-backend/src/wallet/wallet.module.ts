import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { EtherscanModule } from 'src/etherscan/etherscan.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './entities/wallet.entity';
import { UserWallet } from './entities/user-wallet.entity';

@Module({
  imports: [EtherscanModule, TypeOrmModule.forFeature([Wallet, UserWallet])],
  providers: [WalletService],
  controllers: [WalletController],
})
export class WalletModule {}
