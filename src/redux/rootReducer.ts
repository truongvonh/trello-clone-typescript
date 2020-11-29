import { combineReducers } from '@reduxjs/toolkit';
import { auth } from 'pages/authenticate/login/store/reducer';
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
export const history = createBrowserHistory();

const rootReducer = combineReducers({
  auth: auth.reducer,
  router: connectRouter(history),
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
