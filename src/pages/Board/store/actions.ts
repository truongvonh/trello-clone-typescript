import { AppThunk } from 'redux/store';
import { AxiosResponse } from 'axios';
import axiosInstance from 'api/axios-config';
import { BOARD_ENDPOINT, UNSPLASH_ENDPOINT } from 'api/endpoint';
import {
  endBoardProcess,
  IUnsplashImage,
  selectUnsplashImage,
  setAllUnsplashImageSuccess,
  startBoardProcess,
  toggleBoardModal,
} from './reducer';
import { selectUnsplashImageChoose } from 'pages/Board/store/selector';
import { HelperServices } from 'services/helper';
import { history } from 'redux/rootReducer';
import { PageEnum } from 'router/page.enum';

export enum OrderBy {
  Latest = 'latest',
  Oldest = 'oldest',
  Popular = 'popular',
}

export interface IQueryImagePayload {
  page: number;
  per_page: number;
  order_by?: OrderBy;
}

export const getAllUnsplashImage = (
  queryPayload: IQueryImagePayload
): AppThunk => async (dispatch, getState) => {
  try {
    const {
      data,
    }: AxiosResponse<Array<IUnsplashImage>> = await axiosInstance.get(
      UNSPLASH_ENDPOINT.GET_ALL,
      { params: { ...queryPayload, order_by: OrderBy.Latest } }
    );
    dispatch(setAllUnsplashImageSuccess(data));
    dispatch(selectUnsplashImage(data[0].urls));
  } catch (err) {}
};

export const createNewBoard = (name: string): AppThunk => async (
  dispatch,
  getState
) => {
  try {
    const helperService = new HelperServices();
    dispatch(startBoardProcess());
    const urls = selectUnsplashImageChoose(getState());
    const payload = { name, urls };
    const { data: newBoard } = await axiosInstance.post(
      BOARD_ENDPOINT.CREATE_BOARD,
      payload
    );
    history.push(
      helperService.placeParams(PageEnum.BOARD_DETAIL_PAGE, {
        boardId: newBoard._id,
      })
    );
    dispatch(toggleBoardModal(false));
  } catch (err) {
  } finally {
    await new HelperServices().sleep(400);
    dispatch(endBoardProcess());
  }
};
