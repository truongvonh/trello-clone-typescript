import * as React from 'react';
import './trello.loading.less';
import { Modal } from 'antd';

const TrelloLoading = () => {
  return <div className={'trello-loading default'} />;
};

interface ITrelloLoadingWrapper {
  visible: boolean;
}

export const TrelloLoadingWrapper: React.FC<ITrelloLoadingWrapper> = ({ visible }) => {
  return (
    <Modal
      className={'modal-trello-loading'}
      title={null}
      visible={visible}
      footer={null}
      centered
      closeIcon={null}
    >
      <div className={'trello-loading default'} />
    </Modal>
  );
};

export default React.memo(TrelloLoading);
