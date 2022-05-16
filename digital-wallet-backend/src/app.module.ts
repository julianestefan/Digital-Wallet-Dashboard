import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { UserModule } from './user/user.module';
import { WalletModule } from './wallet/wallet.module';
import { DatabaseModule } from './database/database.module';
import { GlobalGuard } from './core/guards/global.guard';

@Module({
  imports: [WalletModule, UserModule, DatabaseModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: GlobalGuard,
    },
  ],
})
export class AppModule {}
