import styles from './styles.module.css';
import { Route } from '../routes/routes';
import Link from './Link';
import { memo } from 'react';
import BtnLogOut from './components/BtnLogOut';
import { useSelector } from 'react-redux';
import { RootStore } from '../../../redux';

interface NavbarProps {
    userRoutes: Route[];
}

const Navbar = ({ userRoutes }: NavbarProps) => {

    const user = useSelector<RootStore>(state => state.auth.user);

    const buildLinks = () => {
        return userRoutes
            .filter((route) => route.isInLayout())
            .map((route) => (
                <Link
                    key={route.routeProps.path?.toString()}
                    to={route.routeProps.path}
                    layoutProps={route.layoutProps}
                />
            ));
    };

    const showLogOutBtn = () => {
        if (user === undefined) {
            return false;
        } else {
            return true;
        }
    };

    return (
        <div className={styles.navbar}>
            <div className={styles.links}>
                {buildLinks()}
            </div>

            <div>
                {showLogOutBtn() && (<BtnLogOut />)}
            </div>
        </div>
    );
};

export default memo(Navbar);
