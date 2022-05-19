import { FC } from 'react';
import { NavLink } from 'react-router-dom'; 
import { Path } from '../../../../constants/enum/path.enum';

import {  LayoutProps } from '../../routes/routes';
import styles from './styles.module.css';

interface CustomLinkProps {
	to: Path,
	layoutProps? : LayoutProps
}

const CustomLink: FC<CustomLinkProps> = ({to, layoutProps}) => {
	return <NavLink activeClassName={styles.active}  to={to} className={styles.link}>
		<>
		{layoutProps?.icon}
		{layoutProps?.name}
		</>
	</NavLink>;
};

export default CustomLink;
