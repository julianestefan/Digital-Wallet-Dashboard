import {
  Alert,
  Grid,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { ExchangeRate } from "../../../../../../constants/dto/exchange-rate.dto";
import { Wallet } from "../../../../../../constants/dto/wallet.dto";
import styles from "./styles.module.css";

interface UserWalletDetailsProps {
  wallet: Wallet;
  exchangeRates: ExchangeRate[];
}

function WalletDetails({ exchangeRates, wallet }: UserWalletDetailsProps) {
  const [selectedExchangeRate, setSelectedExchangeRate] =
    useState<ExchangeRate>();


  useEffect(() => {
    if (exchangeRates.length) {
      setSelectedExchangeRate(exchangeRates[0]);
    }
  }, [exchangeRates]);

  return (
    <Grid>
      {wallet.isOld && <Alert severity="info"> Wallet is old </Alert>}
      <Grid container flexDirection="row" justifyContent="space-between">
        <Grid item md={6} padding={2}>
          <Paper className={styles.Paper} elevation={3}>
            <TextField disabled fullWidth value={selectedExchangeRate?.value} />
          </Paper>
        </Grid>
        <Grid padding={2} item md={6}>
          <Paper className={styles.Paper} elevation={3}>
            {selectedExchangeRate && (
              <>
                <Select
                  onChange={(event) =>
                    setSelectedExchangeRate(
                      exchangeRates.find(
                        (rate) => rate.id === event.target.value
                      )
                    )
                  }
                  value={selectedExchangeRate?.id}
                  fullWidth
                >
                  {exchangeRates.map((rate) => (
                    <MenuItem key={rate.id} value={rate.id}>
                      {rate.convertedCurrency}{" "}
                    </MenuItem>
                  ))}
                </Select>
                <Typography margin={2} variant="h6">
                  {(selectedExchangeRate?.value / wallet.ethBalance).toFixed(2)}
                  {selectedExchangeRate.convertedCurrency}
                </Typography>
              </>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default WalletDetails;
