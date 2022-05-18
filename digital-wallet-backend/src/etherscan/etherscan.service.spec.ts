import { Test, TestingModule } from '@nestjs/testing';
import { EtherscanService } from './etherscan.service';
import * as api from 'etherscan-api';
import { BadRequestException } from '@nestjs/common';

api.init = jest.fn(() => ({
  account: {
    balance: jest.fn((address: string) => ({}) ),
  },
}));

describe('EtherscanService', () => {
  let service: EtherscanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EtherscanService],
    }).compile();

    service = module.get<EtherscanService>(EtherscanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call api init', () => {
    expect(api.init).toHaveBeenCalled();
  });

  it('should trhow an exception if invalid address is provided', async () => {
    await expect(service.getAddressData('as')).rejects.toThrow(BadRequestException);
  });

  it('should trhow an exception if invalid address is provided', async () => {
    const result = await service.getAddressData(
      '0xeB2629a2734e272Bcc07BDA959863f316F4bD4Cf',
    );

    expect(result).toBeDefined();
  });
});
