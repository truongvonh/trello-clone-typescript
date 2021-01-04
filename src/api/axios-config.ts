import {message} from 'antd';
import axios, {AxiosError, AxiosResponse} from 'axios';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import {history} from "redux/rootReducer";
import {StatusEnum} from "api/status.enum";
import {PageEnum} from "router/page.enum";
import {LocalStoreService} from "services/localStore";
import {AUTH_KEY} from "constant/localstore.key";
import {auth, IUserInfo} from 'pages/authenticate/login/store/reducer';
import {HelperServices} from "services/helper";
import store from "redux/store";


const helperService = new HelperServices()

const axiosInstance = axios.create({
  baseURL: helperService.isProduction() ? 'https://api.trello-clone.dev/api' : `http://localhost:4000/api` ,
  withCredentials: true
});

axiosInstance.interceptors.request.use(function(config) {
  return config;
});


axiosInstance.interceptors.response.use(
  function(response: AxiosResponse) {
    return response;
  },
  function(error: AxiosError) {

    if (error?.response?.status === StatusEnum.UNAUTHORIZED) {
      const localStorage = new LocalStoreService()
      const userStorage = localStorage.getParse<IUserInfo>(AUTH_KEY.USER_LOGIN);

      if (userStorage && new HelperServices().isNotEmptyObject(userStorage)) {
        localStorage.deleteItem(AUTH_KEY.USER_LOGIN);
        store.dispatch(auth.actions.getUserInfo({}))
      }

      if (history.location.pathname !== PageEnum.LOGIN_PAGE) {
        return history.replace(PageEnum.LOGIN_PAGE)
      }
    }

    const errorMessage = error?.response?.data?.message?.error || error?.response?.data?.message;
    message.error(errorMessage);
    return Promise.reject(error?.response?.data);
  }
);

const updateProgress = (e: { loaded: number; total: number }) =>
  NProgress.inc(calculatePercentage(e.loaded, e.total));
const calculatePercentage = (loaded: number, total: number) =>
  Math.floor(loaded) / total;

// axiosInstance.defaults.onDownloadProgress = updateProgress;
// axiosInstance.defaults.onUploadProgress = updateProgress;

export default axiosInstance;
