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

export interface ICreateCard {
  listId: string;
  name: string;
}

export interface ICardAdd {
  card: TrelloCard;
  laneId: string;
}
