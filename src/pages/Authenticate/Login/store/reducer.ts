import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LocalStoreService } from 'services/localStore';
import { AUTH_KEY } from 'constant/localstore.key';

export interface IUserInfo {
  _id?: string;
  email?: string;
  name?: string;
}

interface IAuthState {
  userInfo: IUserInfo;
  loading: boolean;
  error: null | string;
}

const initialState: IAuthState = {
  userInfo:
    new LocalStoreService().getParse<IUserInfo>(AUTH_KEY.USER_LOGIN) || {},
  loading: false,
  error: null,
};

export const auth = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    startProcess(state) {
      state.loading = true;
    },
    getUserInfo(state, action: PayloadAction<IUserInfo>) {
      state.userInfo = action.payload;
    },
    onErrored(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    endProcess(state) {
      state.loading = false;
    },
  },
});
