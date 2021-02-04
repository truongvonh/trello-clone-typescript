import * as React from 'react';
import { useEffect } from 'react';
import HeaderBoard from 'pages/Board/components/Header';
import { Col, Row } from 'antd';
import './style.board.less';
import BoardModal from 'pages/Board/components/BoardModal';
import { useDispatch } from 'react-redux';
import { getAllUnsplashImage } from 'pages/Board/store/actions';

interface IBoardPageProps {}
const BoardPage: React.FC<IBoardPageProps> = ({}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getAllUnsplashImage({
        page: 1,
        per_page: 9,
      })
    );
  }, []);

  return (
    <div id="board-page">
      <HeaderBoard />

      <BoardModal />

      <section className={'pt2 mx-auto max-width-4'}>
        <Row>
          <Col span={12}>
            <h2>1321</h2>
          </Col>
        </Row>
      </section>
    </div>
  );
};

export default React.memo(BoardPage);
