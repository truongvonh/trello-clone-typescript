import { RootState } from 'redux/rootReducer';

export const selectAuthLoading = (store: RootState) => store.auth.loading;
export const selectUserInfo = (store: RootState) => store.auth.userInfo;
