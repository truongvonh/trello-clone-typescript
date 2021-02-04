import React from 'react';
import { PlusOutlined } from '@ant-design/icons';

import { Button, Menu, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { boardReducer } from 'pages/Board/store/reducer';

const { toggleBoardModal } = boardReducer.actions;

type Props = {};
const HeaderBoard = (props: Props) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const onOpenBoardModal = () => dispatch(toggleBoardModal(true));

  return (
    <Menu
      mode="horizontal"
      defaultSelectedKeys={['2']}
      className={'flex items-center'}
    >
      <Menu.Item key="1">nav 1</Menu.Item>
      <Menu.Item key="2">nav 2</Menu.Item>
      <Menu.Item key="3">nav 3</Menu.Item>

      <Button
        type={'primary'}
        onClick={onOpenBoardModal}
        className={'ml-auto mr1'}
        icon={
          <Tooltip
            placement="leftBottom"
            title={t('board_page.create_board_hint')}
          >
            <PlusOutlined />
          </Tooltip>
        }
      />
    </Menu>
  );
};

export default React.memo(HeaderBoard);
