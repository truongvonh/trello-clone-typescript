import * as React from 'react';
import './style.main-layout.less';
import HeaderBoard from 'pages/Board/components/Header';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllUnsplashImage } from 'pages/Board/store/actions';

interface IMainLayoutProps {
  children: React.ReactChildren | any;
}

const MainLayout: React.FC<IMainLayoutProps> = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getAllUnsplashImage({
        page: 1,
        per_page: 9,
      })
    );
  }, []);

  return (
    <div className="main-layout ">
      <HeaderBoard />

      {children}
    </div>
  );
};

export default React.memo(MainLayout);
