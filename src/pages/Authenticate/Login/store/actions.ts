import { AppThunk } from 'redux/store';
import { history } from 'redux/rootReducer';
import axiosInstance from 'api/axios-config';
import { AUTH_ENDPOINT } from 'api/endpoint';
import { auth } from './reducer';
import { AxiosResponse } from 'axios';
import { message } from 'antd';
import i18n from 'i18n';
import { HelperServices } from 'services/helper';
import { PageEnum } from 'router/page.enum';
import { LocalStoreService } from 'services/localStore';
import { AUTH_KEY } from 'constant/localstore.key';

const { startProcess, onErrored, getUserInfo, endProcess } = auth.actions;

export interface ILoginPayload {
  email: string;
  password: string;
}

export const loginUser = (payload: ILoginPayload): AppThunk => async (
  dispatch,
  getState
) => {
  try {
    const localStorage = new LocalStoreService();
    dispatch(startProcess());
    const { data }: AxiosResponse = await axiosInstance.post(
      AUTH_ENDPOINT.LOGIN,
      payload
    );
    dispatch(getUserInfo(data));
    localStorage.set(AUTH_KEY.USER_LOGIN, data);
    message.success(i18n.t('login_success'));
    history.push(PageEnum.BOARD_PAGE);
  } catch (err) {
    dispatch(onErrored(err));
  } finally {
    await new HelperServices().sleep(1000);
    dispatch(endProcess());
  }
};

export const getUserLogin = (): AppThunk => async dispatch => {
  try {
    const { data } = await axiosInstance.get(AUTH_ENDPOINT.GET_USER_LOGIN);
    dispatch(getUserInfo(data));
  } catch (err) {
    dispatch(onErrored(err));
  }
};
