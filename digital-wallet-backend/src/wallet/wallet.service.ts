import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ethers } from 'ethers';
import { Repository } from 'typeorm';
import { EtherscanService } from '../etherscan/etherscan.service';
import { UserWallet } from './entities/user-wallet.entity';
import { Wallet } from './entities/wallet.entity';

@Injectable()
export class WalletService {
  constructor(
    private readonly etherscanService: EtherscanService,
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
    @InjectRepository(UserWallet)
    private readonly userWalletRepository: Repository<UserWallet>,
  ) {}

  async createUserWallet(address: string, userId: number) {
    const wallet = await this.getWalletByAddress(address);

    const userWallet = this.userWalletRepository.save({
      userId,
      wallet,
    });

    return userWallet;
  }

  async getWalletByAddress(address: string) {
    const wallet = await this.walletRepository.findOne({
      where: {
        address,
      },
    });

    if (wallet) return wallet;

    const { result } = await this.etherscanService.getAccountBalanceByAddress(
      address,
    );

    const ethBalance = parseFloat(ethers.utils.formatEther(result));

    return this.walletRepository.create({
      address,
      ethBalance,
    });
  }
}
