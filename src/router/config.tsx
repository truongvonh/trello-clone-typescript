import React from 'react';
import { Route } from 'react-router-dom';
import { PageEnum } from './page.enum';

const LoginPage = React.lazy(() => import('pages/authenticate/login'));
const DemoPage = React.lazy(() => import('pages/demo'));

export const routeConfig = [
  {
    path: PageEnum.LOGIN_PAGE,
    exact: true,
    component: LoginPage,
  },
  {
    path: PageEnum.DEMO_PAGE,
    exact: true,
    component: DemoPage,
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
  path: any;
  exact: any;
  component: any;
  routes?: any;
}

export const RouteWithSubRoutes = (route: IRoute) => {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={props => <route.component {...props} routes={route.routes} />}
    />
  );
};
