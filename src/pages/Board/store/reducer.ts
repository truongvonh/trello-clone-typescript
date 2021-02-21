import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TrelloBoardResponse } from 'pages/Board/dto/trello-board.class';
import { IUpdateTittleListPayload } from 'pages/Board/store/actions';

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
  globalLoading: boolean;
  userBoards: Array<IBoardResponse>;
  boardSelected: IBoardResponse | null;
  allLists: TrelloBoardResponse;
}

export const initialBoardState: IBoardState = {
  isDisplayModalBoard: false,
  unsplashImages: [],
  imageSelected: {},
  loading: false,
  globalLoading: false,
  userBoards: [],
  boardSelected: null,
  allLists: {
    lanes: [],
  },
};

export const boardReducer = createSlice({
  name: 'board',
  initialState: initialBoardState,
  reducers: {
    startBoardProcess(state) {
      state.loading = true;
    },
    startGlobalProcess(state) {
      state.globalLoading = true;
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
    endGlobalProcessProcess(state) {
      state.globalLoading = false;
    },
    onGetAllBoards(state, action: PayloadAction<Array<IBoardResponse>>) {
      state.userBoards = action.payload;
    },
    onGetListBoard(state, action: PayloadAction<TrelloBoardResponse>) {
      state.allLists = action.payload;
    },
    onBoardSelected(state, action: PayloadAction<IBoardResponse>) {
      state.boardSelected = action.payload;
    },
    onUpdateTitleList(state, action: PayloadAction<IUpdateTittleListPayload>) {
      const updateIndex = state.allLists.lanes.findIndex(({ id }) => id === action.payload.laneId);
      state.allLists.lanes[updateIndex].title = action.payload.name;
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
  onGetListBoard,
  onBoardSelected,
  onUpdateTitleList,
  startGlobalProcess,
  endGlobalProcessProcess,
} = boardReducer.actions;
