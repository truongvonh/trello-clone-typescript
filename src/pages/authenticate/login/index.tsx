import { Button, Col, Form, Input, Row } from 'antd';
import * as React from 'react';
import { useEffect } from 'react';
import './style.less';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import LoginSlide from './components/LoginSlide';
import { useTranslation } from 'react-i18next';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
  getUserLogin,
  ILoginPayload,
  loginUser,
} from 'pages/authenticate/login/store/actions';
import i18n from 'i18n';
import {
  selectAuthLoading,
  selectUserInfo,
} from 'pages/authenticate/login/store/selector';
import { HelperServices } from 'services/helper';
import { PageEnum } from 'router/page.enum';
import { Redirect } from 'react-router-dom';

const LoginPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const loading = useSelector(selectAuthLoading, shallowEqual);
  const userInfo = useSelector(selectUserInfo, shallowEqual);

  useEffect(() => {
    dispatch(getUserLogin());
  }, []);

  if (new HelperServices().isNotEmptyObject(userInfo))
    return <Redirect to={PageEnum.DEMO_PAGE} />;

  const onFinish = (values: ILoginPayload) => {
    dispatch(loginUser(values));
  };

  return (
    <div id={'login-page'}>
      <Row>
        <Col xs={24} lg={8}>
          <Row wrap align={'middle'} justify={'center'}>
            <Form className="form-login-wrapper" onFinish={onFinish}>
              {/*// @ts-ignore*/}
              <Form.Item name={'email'} rules={formLoginValidate.email}>
                <Input addonBefore={<UserOutlined />} placeholder="Login" />
              </Form.Item>
              <Form.Item name={'password'} rules={formLoginValidate.password}>
                <Input.Password
                  addonBefore={<LockOutlined />}
                  placeholder="Password"
                />
              </Form.Item>

              <div className="button-wrapper">
                <Button type="primary" htmlType="submit" loading={loading}>
                  {t('login')}
                </Button>
              </div>
            </Form>
          </Row>
        </Col>
        <Col xs={24} lg={16}>
          <LoginSlide />
        </Col>
      </Row>
    </div>
  );
};

export default React.memo(LoginPage);

const formLoginValidate = {
  email: [
    {
      message: i18n.t('invalid_email'),
      type: 'email',
    },

    {
      message: i18n.t('require_email'),
      required: true,
    },
  ],
  password: [
    {
      required: true,
      message: i18n.t('require_password'),
    },
  ],
};
