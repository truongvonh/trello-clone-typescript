import React from 'react';
import './App.css';
import { Switch } from 'react-router-dom';
import { routeConfig, RouteWithSubRoutes } from 'router/config';

function App() {
  return (
    <Switch>
      {routeConfig.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
    </Switch>
  );
}

export default App;
