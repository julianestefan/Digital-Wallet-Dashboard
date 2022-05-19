import { Grid } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { UserWallet } from "../../constants/dto/wallet.dto";
import { useGlobalLoader } from "../../hooks/UseGlobalLoader";
import { getUserWallets } from "../../services/api/wallet";
import AddWalletForm from "./components/add-wallet-form";
import UserWalletList from "./components/user-wallet-list";

function Wallets() {
  const [userWallets, setUseerWallets] = useState<UserWallet[]>([]);

  const fetchUserWallets = useGlobalLoader(
    useCallback(async () => {
      const response = await getUserWallets();
      setUseerWallets(response.data);
    }, [])
  );

  useEffect(() => {
    fetchUserWallets();
  }, [fetchUserWallets]);

  return (
    <Grid padding={5} container>
      <Grid container>
        <AddWalletForm />
      </Grid>
      <Grid flexDirection="column"  container>
        <UserWalletList userWallets={userWallets} />
      </Grid>
    </Grid>
  );
}

export default Wallets;
