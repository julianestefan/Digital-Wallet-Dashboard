import { Grid } from '@mui/material';
import { Button, Dialog } from '@mui/material'

interface Props {
   children?: any;
   onClose?: any;
   open?: boolean;
}

const CustomModal = ({
   children,
   onClose = () => { },
   open = false,
}: Props) => {

   return (
      <Dialog
         fullWidth
         open={open}
      >
         <Grid padding={2}>
         {children}
         </Grid>
         <Button onClick={onClose}  >
            Cerrar
         </Button>
      </Dialog>
   )
}

export default CustomModal