import {
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  Grid,
  Hidden,
  Tooltip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

import { Accordion } from "@mui/material";
import { UserWallet } from "../../../../../constants/dto/wallet.dto";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import WalletDetails from "./wallet-details.ts";
import { ExchangeRate } from "../../../../../constants/dto/exchange-rate.dto";
import { patchUserWalletIsfavorite } from "../../../../../services/api/wallet";
import { useGlobalLoader } from "../../../../../hooks/UseGlobalLoader";
import styles from "./styles.module.css";

interface UserWalletListItemProps {
  userWallet: UserWallet;
  exchangeRates: ExchangeRate[];
  setExchangeRates: Dispatch<SetStateAction<ExchangeRate[]>>;
  setUserWallets: Dispatch<SetStateAction<UserWallet[]>>;
}

const UserWalletListItem = ({
  userWallet,
  exchangeRates,
  setExchangeRates,
  setUserWallets,
}: UserWalletListItemProps) => {
  const [expanded, setExpanded] = useState(false);

  const submitIsFavorite = useGlobalLoader(
    useCallback(async () => {
      await patchUserWalletIsfavorite({
        id: userWallet.id,
        isFavorite: !userWallet.isFavorite,
      });

      setUserWallets((prev) => {
        const newUserWallets = [...prev];

        const walletToUpdate = newUserWallets.find(
          (current) => current.id === userWallet.id
        );

        if (walletToUpdate) {
          walletToUpdate.isFavorite = !walletToUpdate.isFavorite;
        }

        return newUserWallets;
      });
    }, [userWallet, setUserWallets])
  );

  function handleFavoriteChange() {
    submitIsFavorite();
  }

  return (
    <Accordion expanded={expanded} className={styles.Item}>
      <AccordionSummary
        className={styles.Summary}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          flexDirection="row"
        >
          <Grid item xs={10} overflow="hidden">
            <Tooltip title={userWallet.wallet?.address}>
              <Typography width="100px">
                {userWallet.wallet?.address}
              </Typography>
            </Tooltip>
          </Grid>
          <Grid item xs={2}>
            <Button onClick={handleFavoriteChange}>
              {userWallet.isFavorite ? (
                <FavoriteIcon />
              ) : (
                <FavoriteBorderOutlinedIcon />
              )}
            </Button>
            <Button onClick={() => setExpanded((prev) => !prev)}>
              <ExpandMoreIcon />
            </Button>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <WalletDetails
          setExchangeRates={setExchangeRates}
          exchangeRates={exchangeRates}
          wallet={userWallet.wallet}
        />
      </AccordionDetails>
    </Accordion>
  );
};

export default UserWalletListItem;
