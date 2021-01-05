import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { PageEnum } from './page.enum';
import { shallowEqual, useSelector } from 'react-redux';
import { selectUserInfo } from 'pages/Authenticate/Login/store/selector';
import { HelperServices } from 'services/helper';

const LoginPage = React.lazy(() => import('pages/Authenticate/Login'));
const DemoPage = React.lazy(() => import('pages/demo'));
const NotFoundPage = React.lazy(() => import('pages/NotFound'));
const BoardPage = React.lazy(() => import('pages/Board'));

export const routeConfig = [
  {
    path: PageEnum.LOGIN_PAGE,
    exact: true,
    component: LoginPage,
  },
  {
    path: PageEnum.DEMO_PAGE,
    exact: true,
    isPrivate: true,
    component: DemoPage,
  },
  {
    path: PageEnum.BOARD_PAGE,
    exact: true,
    isPrivate: true,
    component: BoardPage,
  },
  {
    path: PageEnum.NOT_FOUND_PAGE,
    component: NotFoundPage,
  },
  // {
  //   path: '/tacos',
  //   component: Tacos,
  //   routes: [
  //     {
  //       path: '/tacos/bus',
  //       component: Bus,
  //     },
  //     {
  //       path: '/tacos/cart',
  //       component: Cart,
  //     },
  //   ],
  // },
];

interface IRoute {
  path: PageEnum;
  exact?: boolean;
  component: React.FC<any>;
  routes?: IRoute[];
  isPrivate?: boolean;
}

const PrivateRoute: React.FC<IRoute> = privateProps => {
  const userInfo = useSelector(selectUserInfo, shallowEqual);
  const helperService = new HelperServices();

  if (helperService.isNotEmptyObject(userInfo))
    return <privateProps.component {...privateProps} />;

  return <Redirect to={PageEnum.LOGIN_PAGE} />;
};

export const RouteWithSubRoutes = (route: IRoute) => {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={props =>
        route.isPrivate ? (
          <PrivateRoute {...route} />
        ) : (
          <route.component {...props} />
        )
      }
    />
  );
};
