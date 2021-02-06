import * as React from 'react';
import { Col, Row } from 'antd';
import './style.board.less';

interface IBoardPageProps {}
const BoardPage: React.FC<IBoardPageProps> = ({}) => {
  return (
    <div id="board-page" className={'fade-in'}>
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
