import { Grid } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { ExchangeRate } from "../../constants/dto/exchange-rate.dto";
import { UserWallet } from "../../constants/dto/wallet.dto";
import { Currency } from "../../constants/enum/currency.enum";
import { useGlobalLoader } from "../../hooks/UseGlobalLoader";
import { getExchangeRageByBaseCurrency } from "../../services/api/exchange-rate";
import { getUserWallets } from "../../services/api/wallet";
import AddWalletForm from "./components/add-wallet-form";
import UserWalletList from "./components/user-wallet-list";

function Wallets() {
  const [userWallets, setUseerWallets] = useState<UserWallet[]>([]);
  const [exchangeRates, setExchangeRates] = useState<ExchangeRate[]>([]);

  const fetchUserWallets = useGlobalLoader(
    useCallback(async () => {
      const response = await getUserWallets();
      const ratesResponse = await getExchangeRageByBaseCurrency(Currency.ETH);
      setUseerWallets(response.data);
      setExchangeRates(ratesResponse.data);
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
      <Grid flexDirection="column" container>
        <UserWalletList exchangeRates={exchangeRates} userWallets={userWallets} />
      </Grid>
    </Grid>
  );
}

export default Wallets;
