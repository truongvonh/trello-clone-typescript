import { IBoardResponse } from '../store/reducer';

export class ListResponse {
  lists!: List[];

  board: IBoardResponse;
}

export class List {
  _id!: string;

  cards!: ListCard[];

  name!: string;
  order!: number;
  createdAt!: Date;
  updatedAt!: Date;
}

export class ListCard {
  _id!: string;

  listId!: string;
  name!: string;
  order!: number;
}
