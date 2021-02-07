import { RootState } from 'redux/rootReducer';

export const selectBoardModalStatus = (store: RootState) => store.board.isDisplayModalBoard;

export const selectUnsplashImages = (store: RootState) => store.board.unsplashImages;

export const selectUnsplashImageChoose = (store: RootState) => store.board.imageSelected;

export const selectBoardLoading = (store: RootState) => store.board.loading;

export const selectAllUserBoard = (store: RootState) => store.board.userBoards;
