import { combineReducers } from '@reduxjs/toolkit';
import { auth } from 'pages/Authenticate/Login/store/reducer';
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { boardReducer } from 'pages/Board/store/reducer';

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  auth: auth.reducer,
  board: boardReducer.reducer,
  router: connectRouter(history),
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
