import { Dispatch, memo, SetStateAction } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as ethers from "ethers";
import * as yup from "yup";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { postUserWallet } from "../../../../services/api/wallet";
import styles from "./styles.module.css";
import { UserWallet } from "../../../../constants/dto/wallet.dto";
import {
  endLoading,
  startLoading,
} from "../../../../redux/actions/loading/loading";
import { useDispatch } from "react-redux";
import { setMessage } from "../../../../redux/actions/message";

interface FormFields {
  address: string;
}

const schema = yup
  .object({
    address: yup
      .string()
      .required("You must complete the adress")
      .test("eth-address", "It has not a valid address format", (value) =>
        ethers.utils.isAddress(value || "")
      ),
  })
  .required();

interface AddWalletFormProps {
  setUserWallets: Dispatch<SetStateAction<UserWallet[]>>;
}

function AddWalletForm({ setUserWallets }: AddWalletFormProps) {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormFields>({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();

  const onSubmit = handleSubmit(async (data) => {
    dispatch(startLoading());
    try {
      const response = await postUserWallet(data);

      setUserWallets((prev) => {
        const newUserWallets = prev.concat(response.data);

        return newUserWallets;
      });
    } catch (error) {
      dispatch(setMessage({ message: "Error creating wallet" }, "error"));
    } finally {
      dispatch(endLoading());
    }
  });

  return (
    <form className={styles.Form} onSubmit={onSubmit}>
      <Grid alignItems="center" container>
        <Grid xs={12} md={4} marginRight={2} item>
          <Controller
            name="address"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                label="Wallet Address"
                placeholder="0x6470cC4Edf5b3629BBB93c481315657f4d4ca2A4"
                fullWidth
                margin="normal"
                {...field}
              />
            )}
          />
          {errors.address && (
            <Typography variant="subtitle2" style={{ color: "red" }}>
              {errors.address.message}
            </Typography>
          )}
        </Grid>
        <Grid xs={12} md={2} item>
          <Button type="submit" color="primary" variant="contained">
            Add wallet
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default memo(AddWalletForm);
