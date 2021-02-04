import { AppThunk } from 'redux/store';
import { AxiosResponse } from 'axios';
import axiosInstance from 'api/axios-config';
import { UNSPLASH_ENDPOINT } from 'api/endpoint';
import {
  IUnsplashImage,
  selectUnsplashImage,
  setAllUnsplashImageSuccess,
} from './reducer';

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
  } catch (err) {
    // dispatch(onErrored(err));
  }
};
