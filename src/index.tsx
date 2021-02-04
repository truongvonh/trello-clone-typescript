import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'asset/css/bass.min.css';
import { ThemeSwitcherProvider } from 'react-css-theme-switcher';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import store from 'redux/store';
import { ConnectedRouter } from 'connected-react-router';
import 'i18n';
import { history } from 'redux/rootReducer';
import { Router } from 'react-router-dom';

const themes = {
  dark: `${process.env.PUBLIC_URL}/dark-theme.css`,
  light: `${process.env.PUBLIC_URL}/light-theme.css`,
};

ReactDOM.render(
  <React.StrictMode>
    <ThemeSwitcherProvider
      themeMap={themes}
      defaultTheme="light"
      insertionPoint="styles-insertion-point"
    >
      <Provider store={store}>
        <Suspense fallback={null}>
          <ConnectedRouter history={history}>
            <Router history={history}>
              <App />
            </Router>
          </ConnectedRouter>
        </Suspense>
      </Provider>
    </ThemeSwitcherProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
