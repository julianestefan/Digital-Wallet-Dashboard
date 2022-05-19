import { HttpService } from '@nestjs/axios';

import { BadRequestException, Injectable } from '@nestjs/common';
import { isEthereumAddress } from 'class-validator';
import * as api from 'etherscan-api';
import {  lastValueFrom, map } from 'rxjs';
import { TransactionOrder } from './enum/transqction-order.enum';
import { EtherscanResponse } from './interfaces/eterscan-response.interface';
import { EtherscanTransaction } from './interfaces/etherscan-transaction.interface';


@Injectable()
export class EtherscanService {
  private readonly api: any;

  constructor(private httpService: HttpService) {
    this.api = api.init(process.env.ETHERSCAN_API_KEY);
  }

  async getAccountBalanceByAddress(
    address: string,
  ): Promise<EtherscanResponse<number>> {
    if (!isEthereumAddress(address)) throw new BadRequestException();

    return await this.api.account.balance(address);
  }

  async getAccountBalanceByAddresses(addresses: string[]) {
    const joinedAddresses = addresses.join(',');

    const data = await lastValueFrom(
      this.httpService
        .get<EtherscanResponse<AddressBalance[]>>('https://api.etherscan.io/api', {
          params: {
            module: 'account',
            action: 'balancemulti',
            address: joinedAddresses,
            tag: 'latest',
            apikey: process.env.ETHERSCAN_API_KEY,
          },
        })
        .pipe(map((res) => res.data)),
    );

    return data;
  }

  async getTransactions(
    address: string,
    startblock: string,
    endblock: string,
    page: number,
    offset: number,
    sort: TransactionOrder,
  ): Promise<EtherscanResponse<EtherscanTransaction[]>> {
    if (!isEthereumAddress(address)) throw new BadRequestException();

    return await this.api.account.txlist(
      address,
      startblock,
      endblock,
      page,
      offset,
      sort,
    );
  }
}
