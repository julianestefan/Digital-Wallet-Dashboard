import { Alert, Grid, Paper, Select, TextField } from "@mui/material";
import { Wallet } from "../../../../../../constants/dto/wallet.dto";
import styles from './styles.module.css';

interface UserWalletDetailsProps {
  wallet: Wallet;
}

function WalletDetails({ wallet }: UserWalletDetailsProps) {
  return (
    <Grid>
      {wallet.isOld && <Alert severity="info"> Wallet is old </Alert>}
      <Grid container flexDirection="row" justifyContent="space-between" >
        <Grid item md={6} padding={2}>
          <Paper className={styles.Paper} elevation={3}>
            <TextField disabled fullWidth value={100} />
          </Paper>
        </Grid>
        <Grid padding={2} item md={6}>
          <Paper className={styles.Paper} elevation={3}>
            <Select fullWidth></Select>
            Balance: {wallet.ethBalance}
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default WalletDetails;
