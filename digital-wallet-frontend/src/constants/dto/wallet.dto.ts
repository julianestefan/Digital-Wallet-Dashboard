export interface CreateUserWalletDTO {
  address: string;
}

export interface UpdateUserWalletFavoriteDTO {
  id: number;
  isFavorite: boolean;
}

export interface Wallet {
  id: number;
  address: string;
  firstTransactionDate: Date;
  isOld: boolean;
  ethBalance: number;
  createdAt: Date;
}

export interface UserWallet {
  id: number;
  walletId: number;
  wallet: Wallet;
  userId: number;
  isFavorite: boolean;
  createdAt: Date;
}
