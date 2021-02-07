import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUnsplashUrls {
  raw?: string;
  full?: string;
  regular?: string;
  small?: string;
  thumb?: string;
}

export interface IUnsplashImage {
  description: string;
  urls: IUnsplashUrls;
}

export interface IBoardResponse {
  name: string;
  _id: string;
  urls: IUnsplashUrls;
}

interface IBoardState {
  isDisplayModalBoard: boolean;
  unsplashImages: Array<IUnsplashImage>;
  imageSelected: IUnsplashUrls;
  loading: boolean;
  userBoards: Array<IBoardResponse>;
}

export const initialBoardState: IBoardState = {
  isDisplayModalBoard: false,
  unsplashImages: [],
  imageSelected: {},
  loading: false,
  userBoards: [],
};

export const boardReducer = createSlice({
  name: 'board',
  initialState: initialBoardState,
  reducers: {
    startBoardProcess(state) {
      state.loading = true;
    },
    toggleBoardModal(state, action: PayloadAction<boolean>) {
      state.isDisplayModalBoard = action.payload;
    },
    setAllUnsplashImageSuccess(state, action: PayloadAction<Array<IUnsplashImage>>) {
      state.unsplashImages = action.payload;
    },
    selectUnsplashImage(state, action: PayloadAction<IUnsplashUrls>) {
      state.imageSelected = action.payload;
    },
    endBoardProcess(state) {
      state.loading = false;
    },
    onGetAllBoards(state, action: PayloadAction<Array<IBoardResponse>>) {
      state.userBoards = action.payload;
    },
  },
});

export const {
  toggleBoardModal,
  setAllUnsplashImageSuccess,
  selectUnsplashImage,
  startBoardProcess,
  endBoardProcess,
  onGetAllBoards,
} = boardReducer.actions;
