import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { ethers } from 'ethers';
import { EtherscanService } from 'src/etherscan/etherscan.service';
import { Repository } from 'typeorm';
import { Wallet } from '../entities/wallet.entity';

@Injectable()
export class UpdateWalletJob {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
    private readonly etherscanService: EtherscanService,
  ) {}

  convert(item: AddressBalance[]) {
    const addressesbalanceMap = {};

    item.forEach(({ account, balance }) => {
      addressesbalanceMap[account] = parseFloat(
        ethers.utils.formatEther(balance),
      );
    });

    return addressesbalanceMap;
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handle() {
    try {
      const wallets = await this.walletRepository.find();
      const addresses = wallets.map((wallet) => wallet.address);

      const response = await this.etherscanService.getAccountBalanceByAddresses(
        addresses,
      );

      const map = this.convert(response.result);

      wallets.forEach((wallet) => {
        const newBalance = map[wallet.address];
        if(newBalance) {
            wallet.ethBalance = newBalance;
        }
      });

      this.walletRepository.save(wallets);
    } catch (error) {
      console.log(error);
    }
  }
}
