import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { END } from 'redux-saga';

import axios from 'axios';
import wrapper from '../../store/configureStore';
import HotelInfo from '../../components/hotelInfo';
import AppLayout from '../../components/AppLayout';
import { Button } from 'antd';
import styled from 'styled-components';
import RoomTypeList from '../../components/roomTypeList';
import RoomTypeForm from '../../components/roomTypeForm';

import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import { LOAD_HOTEL_REQUEST } from '../../reducers/hotel';
import { LOAD_CONTACT_REQUEST } from '../../reducers/contact';

const BookingDiv = styled.div`
  display:inline-block;
  width:100%;
`;

const BookingButton = styled(Button)`
  margin-bottom : 5px;
  float:right;
  margin-right: 5px;
`;
const Hotel = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;
    const { singleHotel } = useSelector((state) => state.hotel);
    const [FormOpend, setFormOpend] = useState(false);
    const onToggleCompany = useCallback(() => {
      setFormOpend((prev) => !prev);
    }, []);

    


  return (
    <AppLayout>
        {singleHotel &&(
      <Head>
        <title>
        {singleHotel.name}
        </title>
      </Head>
      )}
      {singleHotel ? <HotelInfo hotel={singleHotel} /> : null}
      <BookingDiv>
        <BookingButton onClick={onToggleCompany}>{FormOpend === true ? '추가 닫기' : '룸타입 추가'}</BookingButton>
      </BookingDiv>
      { FormOpend && (<RoomTypeForm hotel={singleHotel} />)}
      {singleHotel ? <RoomTypeList roomtype={singleHotel.Roomtypes}  /> : null}
    </AppLayout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    const cookie = context.req ? context.req.headers.cookie : '';
    console.log(context);
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
    context.store.dispatch({
      type: LOAD_HOTEL_REQUEST,
      data: context.params.id,
    });
    context.store.dispatch({
      type: LOAD_CONTACT_REQUEST,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  });

export default Hotel;