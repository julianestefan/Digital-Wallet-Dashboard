import { BadRequestException, Injectable } from '@nestjs/common';
import { isEthereumAddress } from 'class-validator';
import * as api from 'etherscan-api';

export enum TransactionOrder {
  ASC= 'asc',
  DESC= 'desc',
}

interface EtherscanResponse<T> {
  status: string,
  message: string,
  result: T
}
interface EtherscanTransaction  {
  blockNumber: string,
  timeStamp: string,
  hash: string,
  nonce: string,
  blockHash: string,
  transactionIndex: string,
  from: string,
  to: string,
  value: string,
  gas: string,
  gasPrice: string,
  isError: string,
  txreceipt_status: string,
  input: string,
  contractAddress: string,
  cumulativeGasUsed: string,
  gasUsed: string,
  confirmations: string
}


@Injectable()
export class EtherscanService {
  private readonly api: any;

  

  constructor() {
    this.api = api.init(process.env.ETHERSCAN_API_KEY);
  }

  async getAccountBalanceByAddress(address: string) : Promise<EtherscanResponse<number>> {
    if (!isEthereumAddress(address)) throw new BadRequestException();

    return await this.api.account.balance(address);
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
