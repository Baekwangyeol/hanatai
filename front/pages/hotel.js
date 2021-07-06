import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import styled from 'styled-components';
import { Form,Input,Checkbox,Button  } from 'antd';
import { END } from 'redux-saga';
import AppLayout from '../components/AppLayout';
import HotelCard from '../components/hotelCard';
import PostForm from '../components/PostForm';
import wrapper from '../store/configureStore';

import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import { LOAD_HOTELS_REQUEST } from '../reducers/hotel';

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
  const { me } = useSelector((state) => state.user);
  const { hotelPost } = useSelector((state) => state.hotel);

  return (
    <AppLayout>
        <BookingDiv>
        <BookingButton type="primary">
        <Link href='/hotel/form'><a>등록하기</a></Link>
        </BookingButton>
      </BookingDiv>
      {hotelPost.map((hotel) => 
         <HotelCard key={hotel.id} hotel={hotel} />
     )}
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_HOTELS_REQUEST,
  });
  context.store.dispatch(END); // 이게있어야 석세스까지 하고 들고옴
  await context.store.sagaTask.toPromise();// 이게있어야 석세스까지 하고 들고옴
});

export default Hotel;