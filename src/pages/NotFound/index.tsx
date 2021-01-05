import React from 'react';

interface INotFoundProps {}

const NotFoundPage: React.FC<INotFoundProps> = () => {
  return <h2>Not found page</h2>;
};

export default React.memo(NotFoundPage);
