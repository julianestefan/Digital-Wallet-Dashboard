import { RouteProps } from "react-router-dom";

import Landing from "../../../pages";
import SingUp from "../../../pages/signup";
import NotFound from "../../../pages/404";

import { Path } from "../../../constants/enum/path.enum";
import { User } from "../../../constants/dto/user.dto";
import Wallets from "../../../pages/wallets";
import LogIn from "../../../pages/LogIn";

export class Route {
  constructor(
    public readonly routeProps: CustomRouteProps,
    public readonly isPrivate: boolean = false,
    public readonly layoutProps?: LayoutProps
  ) {}

  isInLayout(): Boolean {
    return !!this.layoutProps;
  }
}

export interface LayoutProps {
  name?: string;
  icon?: React.ComponentType;
}

export interface CustomRouteProps extends RouteProps {
  path: Path;
}

export const routes: Array<Route> = [
  new Route({ path: Path.index, component: Landing, exact: true }),
  new Route({ component: SingUp, path: Path.signup, exact: true }),
  new Route({ component: LogIn, path: Path.signin, exact: true }),
  new Route({ component: Wallets, path: Path.wallets, exact: true }, true),
  new Route({ path: Path.notfound, component: NotFound, exact: true }),
];

export const createUserRoutes = (user?: User) => {
  const userRoutes = routes.filter((route) => user || !route.isPrivate);

  return userRoutes;
};
