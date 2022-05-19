import { memo } from "react";
import { ExchangeRate } from "../../../../constants/dto/exchange-rate.dto";

import { UserWallet } from "../../../../constants/dto/wallet.dto";

import UseerWalletListItem from "./user-wallet-item";

interface UserWalletListProps {
  userWallets: UserWallet[];
  exchangeRates: ExchangeRate[];
}

function UserWalletList({ userWallets, exchangeRates }: UserWalletListProps) {
  return (
    <>
      {userWallets.map((userWallet) => (
        <UseerWalletListItem
          exchangeRates={exchangeRates}
          key={userWallet.id}
          userWallet={userWallet}
        />
      ))}
    </>
  );
}

export default memo(UserWalletList);
