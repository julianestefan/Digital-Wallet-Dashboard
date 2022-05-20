import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EtherscanService } from '../etherscan/etherscan.service';
import { UserWallet } from './entities/user-wallet.entity';
import { Wallet } from './entities/wallet.entity';
import { WalletService } from './wallet.service';

describe('WalletService', () => {
  let service: WalletService;

  const mockedEtherscanService = {
    getAccountBalanceByAddress: jest.fn(() => Promise.resolve({ result: 0 })),
    getTransactions: jest.fn(() =>
      Promise.resolve({ result: [{ timeStamp: Date.now() }] }),
    ),
  };

  const mockWalletRepository = {
    create: jest.fn(),
    findOne: jest.fn(),
  };

  const mockUserWalletRepository = {
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WalletService,
        {
          provide: EtherscanService,
          useValue: mockedEtherscanService,
        },
        {
          provide: getRepositoryToken(Wallet),
          useValue: mockWalletRepository,
        },
        {
          provide: getRepositoryToken(UserWallet),
          useValue: mockUserWalletRepository,
        },
      ],
    }).compile();

    service = module.get<WalletService>(WalletService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call findOne in wallet repository with addreess param', async () => {
    const address = 'a';
    const userId = 1;
    await service.createUserWallet(address, userId);

    expect(mockWalletRepository.findOne).toHaveBeenCalledWith({
      where: { address },
    });
  });

  it('should call create wallet if no result was found and save the new user wallet', async () => {
    const address = 'a';
    const userId = 1;
    const getWalletByAddressSpy = jest.spyOn(service, 'getWalletByAddress');

    await service.createUserWallet(address, userId);

    expect(mockWalletRepository.findOne).toHaveBeenCalledWith({
      where: { address },
    });
    expect(getWalletByAddressSpy).toHaveBeenCalledWith(address);
    expect(mockUserWalletRepository.save).toHaveBeenCalled();
  });

  it('should not call save on wallet repository if a wallet with the adress already exists', async () => {
    const address = 'a';
    const userId = 1;
    mockWalletRepository.findOne.mockResolvedValue({});

    await service.createUserWallet(address, userId);

    expect(
      mockedEtherscanService.getAccountBalanceByAddress,
    ).not.toHaveBeenCalled();
    expect(mockWalletRepository.create).not.toHaveBeenCalled();
  });

  it('should call repository update', async () => {
    mockUserWalletRepository.update.mockResolvedValue({ affected: 1 });

    await service.updateUserWalletFavorite({ id: 1, isFavorite: true });

    expect(mockUserWalletRepository.update).toHaveBeenCalled();
  });

  it('should throw an exception if no row is affected ', async () => {
    mockUserWalletRepository.update.mockResolvedValue({ affected: 0 });

    await expect(
      service.updateUserWalletFavorite({ id: 1, isFavorite: true })
    ).rejects.toThrow(NotFoundException);
  });

  it('should call repository update', async () => {
    mockUserWalletRepository.delete.mockResolvedValue({ affected: 1 });

    await service.deleteUserWallet( 1);

    expect(mockUserWalletRepository.delete).toHaveBeenCalled();
  });

  it('should call repository update', async () => {
    mockUserWalletRepository.delete.mockResolvedValue({ affected: 0 });

    await expect(
      service.deleteUserWallet(1)
    ).rejects.toThrow(NotFoundException);
  });
});
