import { Route, Switch } from 'react-router-dom';

import { Route as RouteObject } from '../routes/routes'

interface RouterProps {
	userRoutes: RouteObject[]
}

const Router = ({ userRoutes }: RouterProps) => {
	const builRoutes = () => {
		return userRoutes.map(route => (
			<Route
				key={JSON.stringify(route.routeProps)}
				{...route.routeProps}
			/>
		))
	};

	return <Switch>{builRoutes()}</Switch>;
};

export default Router;
