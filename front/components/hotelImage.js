import React from 'react';
import Slider from 'react-slick';

 const HotelIamge = () => {
    const settings = {
        // dots: true, 아래 dots줄것인지
        arrows: true,
        infinite: true, // 마지막슬라이드에서 처음슬라이드로
        speed: 500,
        slidesToShow: 3, //한번에 스크롤 몇개를 보여줄것인지
        slidesToScroll: 3 //스크롤할때마다 몇장씩넘길지
      };
  return (
    <Slider {...settings}>
      <div>
        <h3>1</h3>
      </div>
      <div>
        <h3>2</h3>
      </div>
      <div>
        <h3>3</h3>
      </div>
      <div>
        <h3>4</h3>
      </div>
      <div>
        <h3>5</h3>
      </div>
      <div>
        <h3>6</h3>
      </div>
    </Slider>
  );
}

export default HotelIamge;