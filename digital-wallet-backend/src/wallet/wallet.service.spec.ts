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
  };

  const mockWalletRepository = {
    create: jest.fn(),
    findOne: jest.fn(),
  };

  const mockUserWalletRepository = {
    save: jest.fn(),
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
    const getWalletByAddressSpy = jest.spyOn(service, 'getWalletByAddress')

    await service.createUserWallet(address, userId);

    expect(getWalletByAddressSpy).toHaveBeenCalledWith(address);
    expect(mockWalletRepository.findOne).toHaveBeenCalledWith({
      where: { address },
    });
    expect(mockUserWalletRepository.save).toHaveBeenCalled();
  });

  it('should not call save on wallet repository if a wallet with the adress already exists', async () => {
    const address = 'a';
    const userId = 1;
    mockWalletRepository.findOne.mockResolvedValue({});

    await service.createUserWallet(address, userId);

    expect(mockedEtherscanService.getAccountBalanceByAddress).not.toHaveBeenCalled();
    expect(mockWalletRepository.create).not.toHaveBeenCalled();

  });
});
