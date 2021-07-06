import React, { useState, useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import Router from 'next/router';
import axios from 'axios';
import { Card,Row,Col } from 'antd';
import AppLayout from '../components/AppLayout';
import HotelCard from '../components/hotelCard';
import wrapper from '../store/configureStore';
import NoticeCard from '../components/noticeCard';
import SlideGuide from '../components/slideGuide/slideGuide';
import CardContent from '../components/CardContent/cardContent';
import { LOAD_MY_INFO_REQUEST} from '../reducers/user';
import { LOAD_TODAY_COUNT_REQUEST } from '../reducers/booking';
import styled,{ createGlobalStyle } from 'styled-components';



const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { todayBooking } = useSelector((state) => state.booking);

  useEffect(() => {
    if (!(me && me.id)) {
      Router.replace('/login');
    }
  }, [me && me.id]);

  return (
  <AppLayout> 
      <TodayInfo>
      <CardContent header='오늘의 예약'>
        <h3>{todayBooking}건</h3>
      </CardContent>
      <CardContent header='COD 마감'>
        <h3>{todayBooking}건</h3>
      </CardContent>
      <CardContent header='행사시작'>
        <h3>{todayBooking}건</h3>
      </CardContent>
      <CardContent header='행사마감'>
        <h3>{todayBooking}건</h3>
      </CardContent>
      </TodayInfo>
      <SlideGuide />
  
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
    type: LOAD_TODAY_COUNT_REQUEST,
  });
  context.store.dispatch(END); // 이게있어야 석세스까지 하고 들고옴
  await context.store.sagaTask.toPromise();// 이게있어야 석세스까지 하고 들고옴
});

export default Home;

const TodayInfo = styled.div`
    display:flex;
    justify-content: space-around;
    background-color: #4e343d;
    padding:60px 20px;
    height:300px;
    
`