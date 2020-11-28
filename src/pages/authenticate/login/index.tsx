import { Col, Row } from 'antd';
import * as React from 'react';
import './style.less';
interface IProps {}

const LoginPage = (props: IProps) => {
  return (
    <div id={'login-page'}>
      <Row>
        <Col xs={8}>Login</Col>
        <Col xs={16}>Slide</Col>
      </Row>
    </div>
  );
};

export default React.memo(LoginPage);
