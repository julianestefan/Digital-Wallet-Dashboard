import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { EtherscanModule } from 'src/etherscan/etherscan.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './entities/wallet.entity';
import { UserWallet } from './entities/user-wallet.entity';
import { UpdateWalletJob } from './jobs/update-wallet-balances.job';

@Module({
  imports: [EtherscanModule, TypeOrmModule.forFeature([Wallet, UserWallet])],
  providers: [WalletService, UpdateWalletJob],
  controllers: [WalletController]
})
export class WalletModule {}
