import { Carousel, Image } from 'antd';
import ImageVenture from 'asset/images/img-ventures.jpg';
import ImageWorking from 'asset/images/img-working.jpg';
import ImageWomen from 'asset/images/img-bruce-mars.jpg';
import * as React from 'react';

const LoginSlide = () => {
  return (
    <Carousel
      className={'slide-login'}
      autoplay
      autoplaySpeed={4000}
      effect={'fade'}
    >
      <div>
        <Image src={ImageVenture} alt={''} />
      </div>
      <div>
        <Image src={ImageWorking} alt={''} />
      </div>
      <div>
        <Image src={ImageWomen} alt={''} />
      </div>
    </Carousel>
  );
};

export default React.memo(LoginSlide);
