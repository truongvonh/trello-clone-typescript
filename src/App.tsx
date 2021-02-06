import React, { useCallback, useEffect } from 'react';
import 'App.less';
import { Redirect, Route, Switch } from 'react-router-dom';
import { routeConfig, RouteWithSubRoutes } from 'router/config';
import { PageEnum } from 'router/page.enum';
import { HelperServices } from 'services/helper';
import { shallowEqual, useSelector } from 'react-redux';
import { selectUserInfo } from 'pages/Authenticate/Login/store/selector';
import axiosInstance from 'api/axios-config';
import { DEVICE_ENDPOINT } from 'api/endpoint';
import { LocalStoreService } from 'services/localStore';
import { LOCAL_KEY } from 'constant/localstore.key';
import MainLayout from 'layouts/MainLayout';
import { useThemeSwitcher } from 'react-css-theme-switcher';
import { StatusTheme } from 'pages/demo';
import { Button } from 'antd';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { THEME_COLOR } from 'constant/theme.color';
import TrelloLoading from 'pages/Board/components/TrelloLoading';

const LoginPage = React.lazy(() => import('pages/Authenticate/Login'));

enum Permission {
  Grant = 'granted',
  Default = 'default',
}

function App() {
  const userInfo = useSelector(selectUserInfo, shallowEqual);
  const helperService = new HelperServices();
  const localStorage = new LocalStoreService();

  const registerUserDevice = () => {
    if (!helperService.isNotEmptyObject(userInfo)) return;

    const localDeviceToken = localStorage.getString(
      LOCAL_KEY.DEVICE_TOKEN_ONE_SIGNAL
    );

    if (localDeviceToken) return;

    OneSignal.getUserId(function(deviceToken: string) {
      if (deviceToken) {
        axiosInstance
          .post(DEVICE_ENDPOINT.REGISTER, {
            deviceToken,
          })
          .then(() =>
            localStorage.set<string>(
              LOCAL_KEY.DEVICE_TOKEN_ONE_SIGNAL,
              deviceToken
            )
          );
      }
    });
  };

  useEffect(() => {
    helperService.loadJs(
      'https://cdn.onesignal.com/sdks/OneSignalSDK.js',
      () => {
        if (window !== undefined && OneSignal) {
          OneSignal.push(() => {
            OneSignal.init({
              appId: process.env.REACT_APP_ONESIGNAL_APP_ID,
            });

            OneSignal.getNotificationPermission((permission: Permission) => {
              console.log('permission', permission);
            });

            registerUserDevice();
          });
        }
      }
    );
  }, []);

  const [isDarkMode, setIsDarkMode] = React.useState<boolean>(false);

  const { switcher, status, themes } = useThemeSwitcher();

  const toggleTheme = useCallback(
    (isChecked: boolean) => {
      setIsDarkMode(isChecked);
      switcher({ theme: isChecked ? themes.dark : themes.light });
    },
    [status]
  );

  const isLoading = status === StatusTheme.LOADING;

  if (isLoading) return null;

  return (
    <>
      <Button
        shape={'circle'}
        size={'large'}
        className={'button-switcher-theme'}
        disabled={isLoading}
        icon={
          <DarkModeSwitch
            checked={isDarkMode}
            onChange={toggleTheme}
            sunColor={THEME_COLOR.WHITE}
            size={30}
          />
        }
      />

      <Switch>
        <Route exact path={PageEnum.LOGIN_PAGE} component={LoginPage} />

        <MainLayout>
          <Switch>
            <Redirect
              exact
              from={PageEnum.DEFAULT_PAGE}
              to={PageEnum.BOARD_PAGE}
            />

            {routeConfig.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route} />
            ))}
          </Switch>
        </MainLayout>
      </Switch>
    </>
  );
}

export default App;
