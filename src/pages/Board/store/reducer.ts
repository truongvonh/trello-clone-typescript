import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUpdateTittleListPayload } from 'pages/Board/store/actions';
import { ICardAdd, IUpdateCardOderPayload, IUpdateListPayload } from 'pages/Board/dto/board.dto';
import { Lane, TrelloBoardResponse, TrelloCard } from 'pages/Board/dto/trello-board.class';
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
    onUpdateCardOrderReducer(state, action: PayloadAction<IUpdateCardOderPayload>) {
      const { sourceLaneId, targetLaneId, position, cardId, cardDetails } = action.payload;
      const { lanes } = state.allLists;
      if (sourceLaneId === targetLaneId) {
        const updateIndex = lanes.findIndex(({ id }) => targetLaneId === id);
        const sourceCardIndex = lanes[updateIndex].cards.findIndex(({ id }) => id === cardId);
        state.allLists.lanes[updateIndex] = replaceItemIndexInArray<TrelloCard>({
          array: lanes[updateIndex].cards,
          sourceIndex: sourceCardIndex,
          targetIndex: position,
          dataReplace: cardDetails,
        });
      } else {
        const updateSourceListId = lanes.findIndex(({ id }) => id === sourceLaneId);
        state.allLists.lanes[updateSourceListId].cards = lanes[updateSourceListId].cards.filter(
          ({ id }) => id !== cardId
        );
        const updateTargetListId = lanes.findIndex(({ id }) => id === targetLaneId);
        const tmpNewCards = [...lanes[updateTargetListId].cards, cardDetails];
        const cardsByTargetListId = state.allLists.lanes[updateTargetListId].cards;
        state.allLists.lanes[updateTargetListId].cards = replaceItemIndexInArray<TrelloCard>({
          array: tmpNewCards,
          sourceIndex: cardsByTargetListId.length,
          targetIndex: position,
          dataReplace: cardDetails,
        });
      }
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
  onUpdateCardOrderReducer,
} = boardReducer.actions;
