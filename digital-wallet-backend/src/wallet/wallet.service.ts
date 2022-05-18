import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ethers } from 'ethers';
import * as moment from 'moment';
import { Repository } from 'typeorm';
import {
  EtherscanService,
  TransactionOrder,
} from '../etherscan/etherscan.service';
import { UpdateUserWalletFavoriteDTO } from './dto/update-user-wallet-favorite.dto';
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

    const transactionReult = await this.etherscanService.getTransactions(
      address,
      null,
      null,
      1,
      1,
      TransactionOrder.ASC,
    );

    const ethBalance = parseFloat(ethers.utils.formatEther(result));

    const firstTransactionTimestamp = parseInt(
      transactionReult.result[0].timeStamp,
    );

    return this.walletRepository.create({
      address,
      ethBalance,
      firstTransactionDate: moment.unix(firstTransactionTimestamp).toDate(),
    });
  }

  async getUserWallets(userId: number) {
    return await this.userWalletRepository.find({
      where: {
        userId,
      },
    });
  }

  async updateUserWalletFavorite(data: UpdateUserWalletFavoriteDTO) {
    const result = await this.userWalletRepository.update(data.id, data);

    if (result.affected === 0)
      throw new NotFoundException('User Wallet does not exist');
  }

  async deleteUserWallet(id: number) {
    const result = await this.userWalletRepository.delete(id);

    if (result.affected === 0)
      throw new NotFoundException('User Wallet does not exist');
  }
}
