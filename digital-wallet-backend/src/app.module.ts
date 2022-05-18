import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { UserModule } from './user/user.module';
import { WalletModule } from './wallet/wallet.module';
import { DatabaseModule } from './database/database.module';
import { GlobalGuard } from './core/guards/global.guard';
import { ExchangeRateModule } from './exchange-rate/exchange-rate.module';
import { EtherscanModule } from './etherscan/etherscan.module';

@Module({
  imports: [
    WalletModule,
    UserModule,
    ExchangeRateModule,
    DatabaseModule,
    EtherscanModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: GlobalGuard,
    },
  ],
})
export class AppModule {}
