import { memo } from "react";

import { UserWallet } from "../../../../constants/dto/wallet.dto";

import UseerWalletListItem from "./user-wallet-item";

interface UserWalletListProps {
  userWallets: UserWallet[];
}

function UserWalletList({ userWallets }: UserWalletListProps) {
  return (
    <>
      {userWallets.map((userWallet) => (
        <UseerWalletListItem key={userWallet.id} userWallet={userWallet} />
      ))}
    </>
  );
}

export default memo(UserWalletList);
