import React, { useMemo } from 'react';
import './style.grid.less';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { selectUnsplashImageChoose, selectUnsplashImages } from 'pages/Board/store/selector';
import { CheckOutlined } from '@ant-design/icons';
import { selectUnsplashImage } from 'pages/Board/store/reducer';

const GridSquareImage = () => {
  const allImages = useSelector(selectUnsplashImages, shallowEqual);
  const unsplashImageChoose = useSelector(selectUnsplashImageChoose, shallowEqual);
  const dispatch = useDispatch();

  const onSelectImage = (index: number) => () => {
    dispatch(selectUnsplashImage(allImages[index].urls));
  };

  const renderAllImages = useMemo(
    () =>
      allImages.map(({ urls: { regular }, description }, key) => {
        const isSelected = unsplashImageChoose.regular === regular;

        return (
          <div onClick={onSelectImage(key)} className={isSelected ? 'tick-image' : ''}>
            {isSelected && <CheckOutlined size={25} className={'check-icon'} />}
            <img src={regular} alt={description} />
          </div>
        );
      }),
    [allImages, unsplashImageChoose]
  );

  return <div className="grid-square">{renderAllImages}</div>;
};

export default React.memo(GridSquareImage);
