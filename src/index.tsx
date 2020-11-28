import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ThemeSwitcherProvider } from 'react-css-theme-switcher';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';

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
      <Suspense fallback={null}>
        <Router>
          <App />
        </Router>
      </Suspense>
    </ThemeSwitcherProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
