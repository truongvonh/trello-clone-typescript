import { RootState } from 'redux/rootReducer';

export const selectBoardModalStatus = (store: RootState) => store.board.isDisplayModalBoard;

export const selectUnsplashImages = (store: RootState) => store.board.unsplashImages;

export const selectUnsplashImageChoose = (store: RootState) => store.board.imageSelected;

export const selectBoardLoading = (store: RootState) => store.board.loading;

export const selectGlobalLoading = (store: RootState) => store.board.globalLoading;

export const selectAllUserBoard = (store: RootState) => store.board.userBoards;

export const selectAllList = (store: RootState) => store.board.allLists;

export const selectBoardSelected = (store: RootState) => store.board.boardSelected;

export const selectEventBus = (store: RootState) => store.board.eventBus;
