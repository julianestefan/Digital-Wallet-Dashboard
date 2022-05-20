import { Button } from '@mui/material'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Path } from '../../../../constants/enum/path.enum';
import { actionLogOut } from '../../../../redux/actions';

const BtnLogOut = () => {

   const dispatch = useDispatch();
   const history = useHistory();

   const handleLogOut = () => {
      // @ts-ignore
      dispatch(actionLogOut(() => {
         history.push(Path.index)
         localStorage.clear();
      }));
   };

   return (
      <div>
         <Button
            variant='contained'
            onClick={handleLogOut}
         >
            Cerrar Sesión
         </Button>
      </div>
   )
}

export default BtnLogOut