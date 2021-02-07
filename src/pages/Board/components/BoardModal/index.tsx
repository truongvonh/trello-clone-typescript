import * as React from 'react';
import { useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
  selectBoardLoading,
  selectBoardModalStatus,
  selectUnsplashImageChoose,
} from 'pages/Board/store/selector';
import { toggleBoardModal } from 'pages/Board/store/reducer';
import './style.modal.less';
import { PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import GridSquareImage from 'pages/Board/components/GridSquareImage';
import { createNewBoard } from 'pages/Board/store/actions';

const BoardModal = React.memo(() => {
  const isModalBoardStatus = useSelector(selectBoardModalStatus, shallowEqual);
  const isBoardLoading = useSelector(selectBoardLoading, shallowEqual);
  const unsplashImageSelected = useSelector(
    selectUnsplashImageChoose,
    shallowEqual
  );

  const [boardName, setBoardName] = useState<string>('');

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const onChangeBoardName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setBoardName(e.target.value);

  const onSubmitForm = () => dispatch(createNewBoard(boardName));
  const handleCancel = () => dispatch(toggleBoardModal(false));

  return (
    <Modal
      centered
      footer={null}
      closable={false}
      title="Basic Modal"
      onCancel={handleCancel}
      className={'board-modal'}
      visible={isModalBoardStatus}
    >
      <div className="content">
        <div
          className="board-info"
          style={{
            backgroundImage: `url(${unsplashImageSelected.regular})`,
          }}
        >
          <Form.Item name="name" rules={[{ required: true }]}>
            <Input
              name={'name'}
              placeholder={t('board_page.new_board_title')}
              onChange={onChangeBoardName}
            />
          </Form.Item>
        </div>

        <div className="grid-square-wrapper ml1">
          <GridSquareImage />
        </div>
      </div>

      <Button
        htmlType={'submit'}
        disabled={!boardName}
        onClick={onSubmitForm}
        className={'create-board-btn'}
        icon={<PlusOutlined />}
        loading={isBoardLoading}
      >
        {t('board_page.create_board')}
      </Button>
    </Modal>
  );
});

export default BoardModal;
