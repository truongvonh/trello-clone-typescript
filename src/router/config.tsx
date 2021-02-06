import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { PageEnum } from './page.enum';
import { shallowEqual, useSelector } from 'react-redux';
import { selectUserInfo } from 'pages/Authenticate/Login/store/selector';
import { HelperServices } from 'services/helper';

const DemoPage = React.lazy(() => import('pages/demo'));
const NotFoundPage = React.lazy(() => import('pages/NotFound'));
const BoardPage = React.lazy(() => import('pages/Board'));
const BoardDetailPage = React.lazy(() => import('pages/Board/:boardId'));

interface IRoute {
  path: PageEnum;
  exact?: boolean;
  component: React.FC<any>;
  routes?: IRoute[];
  isPrivate?: boolean;
}

export const routeConfig: IRoute[] = [
  {
    path: PageEnum.BOARD_PAGE,
    isPrivate: true,
    exact: true,
    component: BoardPage, // exact: true,
  },
  {
    path: PageEnum.BOARD_DETAIL_PAGE,
    isPrivate: true,
    exact: true,
    component: BoardDetailPage,
  },
  { path: PageEnum.NOT_FOUND_PAGE, component: NotFoundPage },
];

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
