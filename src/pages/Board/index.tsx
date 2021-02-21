import * as React from 'react';
import { useEffect } from 'react';
import { Card, List, Row, Skeleton } from 'antd';
import './style.board.less';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { selectUserInfo } from 'pages/Authenticate/Login/store/selector';
import { getAllBoardOfUser } from 'pages/Board/store/actions';
import { HelperServices } from 'services/helper';
import { selectAllUserBoard, selectBoardLoading } from 'pages/Board/store/selector';
import { IBoardResponse } from 'pages/Board/store/reducer';
import { Link } from 'react-router-dom';
import { PageEnum } from 'router/page.enum';

interface IBoardPageProps {}

const CardBoardItem: React.FC<IBoardResponse> = React.memo(({ urls, name, _id: boardId }) => {
  const isBoardLoading = useSelector(selectBoardLoading, shallowEqual);
  const helperService = new HelperServices();

  return (
    <Skeleton className={'skeleton-board'} paragraph={false} active loading={isBoardLoading}>
      <Link to={helperService.placeParams(PageEnum.BOARD_DETAIL_PAGE, { boardId })}>
        <List.Item className={'card-board-wrapper'}>
          <Card
            style={{
              backgroundImage: `url(${urls.small})`,
              backgroundPosition: 'center',
            }}
          >
            <h3 className={'board-name'}>{name}</h3>
          </Card>
        </List.Item>
      </Link>
    </Skeleton>
  );
});

const BoardPage: React.FC<IBoardPageProps> = ({}) => {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo, shallowEqual);
  const allBoards = useSelector(selectAllUserBoard, shallowEqual);
  const helperService = new HelperServices();

  useEffect(
    () => {
      if (helperService.isNotEmptyObject(userInfo)) {
        dispatch(getAllBoardOfUser(userInfo._id || ''));
      }
    },
    [userInfo]
  );

  return (
    <div id="board-page" className={'fade-in'}>
      <section className={'pt2 mx-auto max-width-4'}>
        <Row>
          <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={allBoards}
            className={'list-board-wrapper'}
            renderItem={board => <CardBoardItem {...board} />}
          />
        </Row>
      </section>
    </div>
  );
};

export default React.memo(BoardPage);
