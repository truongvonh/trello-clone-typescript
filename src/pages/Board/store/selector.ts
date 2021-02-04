import { RootState } from 'redux/rootReducer';

export const selectBoardModalStatus = (store: RootState) =>
  store.board.isDisplayModalBoard;

export const selectUnsplashImages = (store: RootState) =>
  store.board.unsplashImages;

export const selectUnsplashImageChoose = (store: RootState) =>
  store.board.imageSelected;
