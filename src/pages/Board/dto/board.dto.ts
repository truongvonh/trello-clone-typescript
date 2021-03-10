import { Lane, TrelloCard } from 'pages/Board/dto/trello-board.class';
import { OrderBy } from 'pages/Board/store/actions';

export interface IQueryImagePayload {
  page: number;
  per_page: number;
  order_by?: OrderBy;
}

export interface IUpdateListPayload {
  newOrder: number;
  payload: Lane;
}

export interface ICreateListPayload {
  id: string;
  title: string;
}

export interface ICreateCardPayload {
  listId: string;
  name: string;
}

export interface ICardAdd {
  card: TrelloCard;
  laneId: string;
}

export interface IUpdateCardOderPayload {
  cardId: string;
  sourceLaneId: string;
  targetLaneId: string;
  position: number;
  cardDetails: TrelloCard;
}

export interface IUpdateCardOderBodyRequest {
  sourceListId: string;
  targetListId: string;
  order: number;
}
