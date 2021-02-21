import { List, ListCard, ListResponse } from 'pages/Board/dto/list.class';

export class TrelloBoardResponse {
  lanes: Lane[];

  constructor(list: ListResponse) {
    this.lanes = list.lists.map((list) => new Lane(list));
  }
}

class BaseClass {
  id: string;
  title: string;

  constructor(listItem: any) {
    this.id = listItem._id;
    this.title = listItem.name;
  }
}

export class Lane extends BaseClass {
  label: string;
  style: Style;

  cards: TrelloCard[];

  constructor(props: List) {
    super(props);
    this.cards = props.cards.map((card) => new TrelloCard(card));
  }
}

export class TrelloCard extends BaseClass {
  label: string;
  description: string;

  laneId: string;

  constructor(props: ListCard) {
    super(props);
    this.laneId = props.listId;
  }
}

export class Style {
  width: number;
}
