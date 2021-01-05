import * as React from 'react';
import { useThemeSwitcher } from 'react-css-theme-switcher';
import { Button, Col, Input, Row, Space } from 'antd';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

export const StatusTheme = {
  IDLE: 'idle',
  LOADING: 'loading',
  LOADED: 'loaded',
};

interface IProps {}
const DemoPage = (props: IProps) => {
  const [isDarkMode, setIsDarkMode] = React.useState<boolean>(false);
  const { switcher, status, themes } = useThemeSwitcher();

  const toggleTheme = (isChecked: boolean) => {
    setIsDarkMode(isChecked);
    switcher({ theme: isChecked ? themes.dark : themes.light });
  };

  if (status === StatusTheme.LOADING) return null;

  return (
    <div className="main fade-in">
      <Button
        type="primary"
        shape="circle"
        size={'large'}
        icon={
          <DarkModeSwitch
            checked={isDarkMode}
            onChange={toggleTheme}
            sunColor={'#dee8ff'}
            size={28}
          />
        }
      />

      <Space direction={'horizontal'} size={20}>
        <Row>
          <Col span={24}>
            <Input
              addonBefore={<UserOutlined />}
              style={{ width: 300, marginTop: 30 }}
              placeholder="Login"
            />
          </Col>

          <Col span={24}>
            <Input.Password
              addonBefore={<LockOutlined />}
              style={{ width: 300, marginTop: 30 }}
              placeholder="Password"
            />
          </Col>

          <Col xs={24}>
            <Link to={'/authenticate/login'}>
              <Button type="primary">Login</Button>
            </Link>
          </Col>
        </Row>
      </Space>
    </div>
  );
};

export default React.memo(DemoPage);
