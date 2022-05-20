import {
  Alert,
  Button,
  Grid,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ExchangeRate } from "../../../../../../constants/dto/exchange-rate.dto";
import { Wallet } from "../../../../../../constants/dto/wallet.dto";
import styles from "./styles.module.css";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { patchExchangeRateValue } from "../../../../../../services/api/exchange-rate";
import { useGlobalLoader } from "../../../../../../hooks/UseGlobalLoader";

interface UserWalletDetailsProps {
  wallet: Wallet;
  exchangeRates: ExchangeRate[];
  setExchangeRates: Dispatch<SetStateAction<ExchangeRate[]>>;
}

function WalletDetails({
  exchangeRates,
  wallet,
  setExchangeRates,
}: UserWalletDetailsProps) {
  const [selectedExchangeRate, setSelectedExchangeRate] =
    useState<ExchangeRate>();

  const [isEditingRate, setIsEditingRate] = useState<boolean>(false);

  const [rateEditableValue, setRateEditableValue] = useState<number>(0);

  const balance = useMemo(() => {
    if (selectedExchangeRate) {
      const { value, convertedCurrency } = selectedExchangeRate;
      const amount = (value / wallet.ethBalance).toFixed(2);

      return `${amount} ${convertedCurrency}`;
    }
  }, [selectedExchangeRate, wallet.ethBalance]);

  useEffect(() => {
    if (exchangeRates.length) {
      setSelectedExchangeRate(exchangeRates[0]);
      setRateEditableValue(exchangeRates[0].value);
    }
  }, [exchangeRates]);

  const submitNewExchangeRateValue = useGlobalLoader(
    useCallback(async () => {
      if (selectedExchangeRate) {
        const response = await patchExchangeRateValue({
          id: selectedExchangeRate.id,
          value: rateEditableValue,
        });

        setExchangeRates((prev) => {
          const newExchangeRates = [...prev];

          const index = newExchangeRates.findIndex(
            (rate) => rate.id === response.data.id
          );

          newExchangeRates[index] = response.data;

          return newExchangeRates;
        });

        setIsEditingRate(false);
      }
    }, [selectedExchangeRate, rateEditableValue, setExchangeRates])
  );

  function getExchangeRateHeaderButtons() {
    return isEditingRate ? (
      <>
        <Button
          onClick={() => {
            setIsEditingRate(false);
            setRateEditableValue(selectedExchangeRate?.value || 0);
          }}
        >
          <CloseIcon />
        </Button>
        <Button onClick={submitNewExchangeRateValue}>
          <CheckIcon />
        </Button>
      </>
    ) : (
      <Button onClick={() => setIsEditingRate(true)}>
        <ModeEditIcon />
      </Button>
    );
  }

  return (
    <Grid>
      {wallet.isOld && <Alert severity="info"> Wallet is old </Alert>}
      <Grid container flexDirection="row" justifyContent="space-between">
        <Grid item md={6} xs={12}  padding={2}>
          <Paper className={styles.Paper}>
            <Grid marginBottom={2} container justifyContent="flex-end">
              {getExchangeRateHeaderButtons()}
            </Grid>
            <TextField
              disabled={!isEditingRate}
              fullWidth
              onChange={(event) =>
                setRateEditableValue(parseFloat(event.target.value) || 0)
              }
              value={rateEditableValue}
            />
          </Paper>
        </Grid>
        <Grid padding={2} item xs={12} md={6}>
          <Paper className={styles.Paper}>
            {selectedExchangeRate && (
              <>
                <Select
                  onChange={(event) => {
                    const newSelectedRate = exchangeRates.find(
                      (rate) => rate.id === event.target.value
                    );

                    setSelectedExchangeRate(newSelectedRate);

                    setRateEditableValue(newSelectedRate?.value || 0);
                  }}
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
                  {balance}
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
