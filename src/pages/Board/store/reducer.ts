import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUpdateTittleListPayload } from 'pages/Board/store/actions';
import { ICardAdd, IUpdateListPayload } from 'pages/Board/dto/board.dto';
import { Lane, TrelloBoardResponse } from 'pages/Board/dto/trello-board.class';
import { HelperServices } from 'services/helper';

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

export enum EventTypeEnum {
  ADD_CARD = 'ADD_CARD',
  UPDATE_CARD = 'UPDATE_CARD',
  REMOVE_CARD = 'REMOVE_CARD',
  MOVE_CARD = 'MOVE_CARD',
  UPDATE_LANES = 'UPDATE_LANES',
}

export interface IEventBusParam {
  type: EventTypeEnum;
  [key: string]: any;
}

export interface IEventBus {
  publish: (param: IEventBusParam) => {} | null;
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
  eventBus: IEventBus;
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
  eventBus: {
    publish: () => null,
  },
};

const findUpdateIndex = (state: IBoardState, findId: string) => {
  return state.allLists.lanes.findIndex(({ id }: { id: string }) => id === findId);
};

const { replaceItemIndexInArray } = new HelperServices();

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
      const updateIndex = findUpdateIndex(state, action.payload.laneId);

      state.allLists.lanes[updateIndex].title = action.payload.name;
    },
    onAddNewCard(state, action: PayloadAction<ICardAdd>) {
      const updateIndex = findUpdateIndex(state, action.payload.laneId);
      const currentCard = state.allLists.lanes[updateIndex].cards;
      state.allLists.lanes[updateIndex].cards = [...currentCard, action.payload.card];
    },
    setEventBus(state, action: PayloadAction<IEventBus>) {
      state.eventBus = action.payload;
    },
    onUpdateOrderListByReducer(state, action: PayloadAction<IUpdateListPayload>) {
      const { lanes } = state.allLists;
      const { newOrder: targetIndex, payload: dataReplace } = action.payload;
      const sourceIndex = lanes.findIndex(({ id }) => id === dataReplace.id);

      state.allLists.lanes = replaceItemIndexInArray<Lane>({
        array: lanes,
        sourceIndex,
        targetIndex,
        dataReplace,
      });
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
  onAddNewCard,
  setEventBus,
  onUpdateOrderListByReducer,
} = boardReducer.actions;
