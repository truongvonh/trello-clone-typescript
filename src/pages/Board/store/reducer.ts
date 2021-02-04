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

interface IBoardState {
  isDisplayModalBoard: boolean;
  unsplashImages: Array<IUnsplashImage>;
  imageSelected: IUnsplashUrls;
}

export const initialBoardState: IBoardState = {
  isDisplayModalBoard: false,
  unsplashImages: [],
  imageSelected: {},
};

export const boardReducer = createSlice({
  name: 'board',
  initialState: initialBoardState,
  reducers: {
    toggleBoardModal(state, action: PayloadAction<boolean>) {
      state.isDisplayModalBoard = action.payload;
    },
    setAllUnsplashImageSuccess(
      state,
      action: PayloadAction<Array<IUnsplashImage>>
    ) {
      state.unsplashImages = action.payload;
    },
    selectUnsplashImage(state, action: PayloadAction<IUnsplashUrls>) {
      state.imageSelected = action.payload;
    },
  },
});

export const {
  toggleBoardModal,
  setAllUnsplashImageSuccess,
  selectUnsplashImage,
} = boardReducer.actions;
