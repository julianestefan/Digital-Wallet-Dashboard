import { Dispatch, memo, SetStateAction } from "react";
import { ExchangeRate } from "../../../../constants/dto/exchange-rate.dto";

import { UserWallet } from "../../../../constants/dto/wallet.dto";

import UseerWalletListItem from "./user-wallet-item";

interface UserWalletListProps {
  userWallets: UserWallet[];
  exchangeRates: ExchangeRate[];
  setExchangeRates: Dispatch<SetStateAction<ExchangeRate[]>>;
  setUserWallets: Dispatch<SetStateAction<UserWallet[]>>;
}

function UserWalletList({
  userWallets,
  exchangeRates,
  setExchangeRates,
  setUserWallets
}: UserWalletListProps) {

  return (
    <>
      {userWallets.map((userWallet) => (
        <UseerWalletListItem
          setExchangeRates={setExchangeRates}
          exchangeRates={exchangeRates}
          key={userWallet.id}
          userWallet={userWallet}
          setUserWallets={setUserWallets}
        />
      ))}
    </>
  );
}

export default memo(UserWalletList);
