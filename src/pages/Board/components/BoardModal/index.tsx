import * as React from 'react';
import { Button, Input, Modal } from 'antd';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { selectBoardModalStatus, selectUnsplashImageChoose } from 'pages/Board/store/selector';
import { toggleBoardModal } from 'pages/Board/store/reducer';
import './style.modal.less';
import { PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import GridSquareImage from 'pages/Board/components/GridSquareImage';

const BoardModal = React.memo(() => {
  const isModalBoardStatus = useSelector(selectBoardModalStatus, shallowEqual);
  const unsplashImageSelected = useSelector(selectUnsplashImageChoose, shallowEqual);

  const dispatch = useDispatch();
  const { t } = useTranslation();

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
          <Input placeholder={t('board_page.new_board_title')} />
        </div>

        <div className="grid-square-wrapper ml1">
          <GridSquareImage />
        </div>
      </div>

      <Button className={'create-board-btn'} icon={<PlusOutlined />}>
        {t('board_page.create_board')}
      </Button>
    </Modal>
  );
});

export default BoardModal;
