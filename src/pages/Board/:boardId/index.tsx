import * as React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
  getAllListBoard,
  onCreateNewList,
  onUpdateCardOrder,
  onUpdateOrderList,
  onUpdateTittleList,
} from '../store/actions';
import './detail.style.less';
// @ts-ignore
import Board from 'react-trello';
import { selectAllList, selectBoardSelected, selectGlobalLoading } from '../store/selector';
import {
  IBoardResponse,
  IEventBus,
  onGetListBoard,
  onUpdateOrderListByReducer,
  setEventBus,
} from 'pages/Board/store/reducer';
import io from 'socket.io-client';
import {
  BOARD_EMIT_EVENT,
  CARD_SUBSCRIBE_EVENT,
  LIST_SUBSCRIBE_EVENT,
} from 'pages/Board/constants/board.socket-events';
import { List } from '../dto/list.class';
import { TrelloLoadingWrapper } from '../components/TrelloLoading';
import { Lane, TrelloCard } from 'pages/Board/dto/trello-board.class';
import { ICreateListPayload } from 'pages/Board/dto/board.dto';

const ENDPOINT = 'ws://localhost:4000/board';

interface IBoardParam {
  boardId: string;
}

const boardStyle = (boardSelected: IBoardResponse | null) => ({
  background: `url(${boardSelected?.urls.full}) center center no-repeat`,
});

const BoardDetailPage = () => {
  const { boardId }: IBoardParam = useParams();
  const dispatch = useDispatch();
  const allList = useSelector(selectAllList, shallowEqual);
  const globalLoading = useSelector(selectGlobalLoading, shallowEqual);
  const boardSelected = useSelector(selectBoardSelected, shallowEqual);

  const handleListSocket = () => {
    const socket = io(ENDPOINT);

    socket.on(LIST_SUBSCRIBE_EVENT.CONNECT, function () {
      socket.emit(BOARD_EMIT_EVENT.JOIN_BOARD, boardId);
    });

    socket.on(LIST_SUBSCRIBE_EVENT.CREATED_LIST, (newList: List) => {
      const newLane = new Lane(newList);
      const isExistList = allList.lanes.some(({ id }) => id === newLane.id);

      if (isExistList) return;

      dispatch(onGetListBoard({ ...allList, lanes: [...allList.lanes, newLane] }));
    });

    socket.on(
      LIST_SUBSCRIBE_EVENT.UPDATED_LIST,
      ({ listToUpdate, newOrder }: { listToUpdate: List; newOrder: number }) => {
        const parseLane = new Lane(listToUpdate);
        const currentOrder = allList.lanes.findIndex(({ id }) => id === listToUpdate._id);

        if (currentOrder !== listToUpdate.order) return;

        dispatch(onUpdateOrderListByReducer({ payload: parseLane, newOrder }));
      }
    );

    socket.on(CARD_SUBSCRIBE_EVENT.NEW_CARD_ADDED, (newCard: any) => {});

    socket.on(CARD_SUBSCRIBE_EVENT.UPDATED_CARD_ORDER, (payload: any) => {});

    return socket;
  };

  useEffect(() => {
    const socket = handleListSocket();

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    dispatch(getAllListBoard(boardId));
  }, [boardId]);

  const handleLaneDragEnd = (_: number, newOrder: number, payload: Lane): void => {
    dispatch(onUpdateOrderList({ newOrder, payload }));
  };

  const onLaneAdd = (params: ICreateListPayload) => {
    dispatch(onCreateNewList(params));
  };

  const onLaneUpdate = (laneId: string, data: { title: string }) => {
    dispatch(onUpdateTittleList({ laneId, name: data.title }));
  };

  const handleEventBus = (handle: IEventBus) => {
    dispatch(setEventBus(handle));
  };

  const handleDragEnd = (
    cardId: string,
    sourceLaneId: string,
    targetLaneId: string,
    position: number,
    cardDetails: TrelloCard
  ) => {
    dispatch(onUpdateCardOrder({ cardId, sourceLaneId, targetLaneId, position, cardDetails }));
  };

  const onCardUpdate = () => {};

  return (
    <>
      <Board
        editable
        draggable
        canAddLanes
        editLaneTitle
        data={allList}
        hideCardDeleteIcon
        disallowAddingCard
        onLaneAdd={onLaneAdd}
        onLaneUpdate={onLaneUpdate}
        onCardUpdate={onCardUpdate}
        style={boardStyle(boardSelected)}
        eventBusHandle={handleEventBus}
        handleLaneDragEnd={handleLaneDragEnd}
        handleDragEnd={handleDragEnd}
      />
      <TrelloLoadingWrapper visible={globalLoading} />
    </>
  );
};

export default React.memo(BoardDetailPage);
