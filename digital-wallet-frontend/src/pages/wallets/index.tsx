import { FormControlLabel, Grid, Checkbox } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ExchangeRate } from "../../constants/dto/exchange-rate.dto";
import { UserWallet } from "../../constants/dto/wallet.dto";
import { Currency } from "../../constants/enum/currency.enum";
import { useGlobalLoader } from "../../hooks/UseGlobalLoader";
import { getExchangeRageByBaseCurrency } from "../../services/api/exchange-rate";
import { getUserWallets } from "../../services/api/wallet";
import AddWalletForm from "./components/add-wallet-form";
import UserWalletList from "./components/user-wallet-list";

function Wallets() {
  const [userWallets, setUserWallets] = useState<UserWallet[]>([]);
  const [exchangeRates, setExchangeRates] = useState<ExchangeRate[]>([]);
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  const fetchUserWallets = useGlobalLoader(
    useCallback(async () => {
      const response = await getUserWallets();
      const ratesResponse = await getExchangeRageByBaseCurrency(Currency.ETH);
      setUserWallets(response.data);
      setExchangeRates(ratesResponse.data);
    }, [])
  );

  useEffect(() => {
    fetchUserWallets();
  }, [fetchUserWallets]);

  const userWalletsToDisplay = useMemo(() => {
    if(onlyFavorites) {
      return userWallets.filter(userWallet => userWallet.isFavorite )
    }else {
      return userWallets;
    }
  }, [userWallets, onlyFavorites])

  return (
    <Grid padding={2} container>
      <Grid container>
        <AddWalletForm setUserWallets={setUserWallets} />
        <FormControlLabel
          control={
            <Checkbox
              onChange={(event) => setOnlyFavorites(event.target.checked)}
              checked={onlyFavorites}
            />
          }
          label="Only Favorites"
        />
      </Grid>
      <Grid flexDirection="column" container>
        <UserWalletList
          setExchangeRates={setExchangeRates}
          exchangeRates={exchangeRates}
          userWallets={userWalletsToDisplay}
          setUserWallets={setUserWallets}
        />
      </Grid>
    </Grid>
  );
}

export default Wallets;
