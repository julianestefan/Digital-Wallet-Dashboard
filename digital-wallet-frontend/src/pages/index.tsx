import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom';

import Login from './LogIn';
import { Path } from '../constants/enum/path.enum';
import { User } from '../constants/dto/user.dto';
import { RootStore } from '../redux';

const Landing = () => {
    const user = useSelector<RootStore>(state => state.auth.user) as User;
    
    return user ? <Redirect to={Path.wallets} /> : <Login />
}

export default Landing
