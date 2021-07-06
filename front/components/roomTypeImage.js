import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import { convertLegacyProps } from 'antd/lib/button/button';



 const RoomTypeIamge = () => {
    const settings = {
        // dots: true, 아래 dots줄것인지
        arrows: true,
        infinite: true, // 마지막슬라이드에서 처음슬라이드로
        speed: 500,
        slidesToShow: 1, //한번에 스크롤 몇개를 보여줄것인지
        slidesToScroll: 1 //스크롤할때마다 몇장씩넘길지
      };
  return (
    <div>
        <Slider {...settings}>
      <div>
        <img src='http://localhost:3065/sheraton_1614227640685.png' />
      </div>
  
    </Slider>
    </div>
  );
}

export default RoomTypeIamge;