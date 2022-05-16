import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';

import { WalletModule } from './wallet/wallet.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    WalletModule, 
    UserModule, 
    DatabaseModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
