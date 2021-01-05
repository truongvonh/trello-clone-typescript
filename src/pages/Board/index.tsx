import * as React from 'react';
import HeaderBoard from 'pages/Board/components/Header';

interface IBoardPageProps {}
const BoardPage: React.FC<IBoardPageProps> = ({}) => {
  return (
    <div id="board-page">
      <HeaderBoard />
    </div>
  );
};

export default React.memo(BoardPage);
