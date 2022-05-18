import { BadRequestException, Injectable } from '@nestjs/common';
import { isEthereumAddress } from 'class-validator';
import * as api from 'etherscan-api';

@Injectable()
export class EtherscanService {
  private readonly api: any;

  constructor() {
    this.api = api.init(process.env.ETHERSCAN_API_KEY);
  }

  async getAccountBalanceByAddress(address: string) {
    if (!isEthereumAddress(address)) throw new BadRequestException();

    return await this.api.account.balance(address);
  }
}
