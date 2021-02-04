import React, { useEffect } from 'react';
import './App.css';
import { Redirect, Switch } from 'react-router-dom';
import { routeConfig, RouteWithSubRoutes } from 'router/config';
import { PageEnum } from 'router/page.enum';
import { HelperServices } from 'services/helper';
import { shallowEqual, useSelector } from 'react-redux';
import { selectUserInfo } from 'pages/Authenticate/Login/store/selector';
import axiosInstance from 'api/axios-config';
import { DEVICE_ENDPOINT } from 'api/endpoint';
import { LocalStoreService } from 'services/localStore';
import { LOCAL_KEY } from 'constant/localstore.key';

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
