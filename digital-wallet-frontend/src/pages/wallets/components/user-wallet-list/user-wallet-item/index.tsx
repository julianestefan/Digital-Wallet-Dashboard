import {
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

import { Accordion } from "@mui/material";
import { UserWallet } from "../../../../../constants/dto/wallet.dto";
import { memo } from "react";

interface UserWalletListItemProps {
  userWallet: UserWallet;
}

const UserWalletListItem = ({ userWallet }: UserWalletListItemProps) => {
  return (
    <Accordion style={{margin: '15px 0'}} >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          flexDirection="row"
        >
          <Typography>{userWallet.wallet?.address}</Typography>
          <Button>
            {userWallet.isFavorite ? (
              <FavoriteIcon />
            ) : (
              <FavoriteBorderOutlinedIcon />
            )}
          </Button>
        </Grid>
      </AccordionSummary>

      <AccordionDetails></AccordionDetails>
    </Accordion>
  );
};

export default memo(UserWalletListItem);
