import React from 'react';
import './App.css';
import { Redirect, Switch } from 'react-router-dom';
import { routeConfig, RouteWithSubRoutes } from 'router/config';
import { PageEnum } from 'router/page.enum';

function App() {
  return (
    <>
      <Switch>
        <Redirect exact from={PageEnum.DEFAULT_PAGE} to={PageEnum.DEMO_PAGE} />
        {routeConfig.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>
    </>
  );
}

export default App;
