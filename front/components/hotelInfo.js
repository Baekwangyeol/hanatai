import React, { useCallback, useState } from 'react';
import { Descriptions,Rate,List ,Button} from 'antd';
import {useSelector,useDispatch} from 'react-redux';
import styled from 'styled-components';

import HotelContact from './hotelContact';
import HotelImage from './hotelImage';

const BookingDiv = styled.div`
  display:inline-block;
  width:100%;
`;

const BookingButton = styled(Button)`
  margin-bottom : 5px;
  float:right;
  margin-right: 5px;
`;

const hotelInfo = ({ hotel }) => {
    const dispatch = useDispatch();
    const [ContactOpend, setContactOpend] = useState(false);
    const onToggleCompany = useCallback(() => {
      setContactOpend((prev) => !prev);
    }, []);

    
    return(
        <>
      <BookingDiv>
        <BookingButton onClick={onToggleCompany}>{ContactOpend === true ? '추가 닫기' : '예약채널 추가'}</BookingButton>
      </BookingDiv>
      
      <Descriptions
      title='호텔INFO'
      bordered
      column={{ xxl: 3, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
    >
      <Descriptions.Item label="Hotel">{hotel.name}</Descriptions.Item>
      <Descriptions.Item label="star"><Rate value={hotel.star} /></Descriptions.Item>
      <Descriptions.Item label="Initial">{hotel.Abbreviation}</Descriptions.Item>
      <Descriptions.Item label="Country">{hotel.Country.country}</Descriptions.Item>
      <Descriptions.Item label="Region">{hotel.Region.region}</Descriptions.Item>
      <Descriptions.Item label="Channel">$60.00</Descriptions.Item>
      <Descriptions.Item label="Channel">
        {hotel.HoteltoContact.name}
      </Descriptions.Item>
    </Descriptions>
      <div>
        <HotelImage />
      </div>
    {/* <img src={`http://localhost:3065/${hotel.src}`} alt={hotel.src} /> */}
        </>
    )

} 

export default hotelInfo;
