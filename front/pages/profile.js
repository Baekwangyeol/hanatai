import React from 'react';
import Head from 'next/head';
import axios from 'axios';
import wrapper from '../store/configureStore';
import { END } from 'redux-saga';
import AppLayout from '../components/AppLayout';
import MyReservation from '../components/MyReservation';
import MyInfo from '../components/MyInfo';
import {LOAD_MY_INFO_REQUEST } from '../reducers/user';
import styled from 'styled-components';

const Logo = styled.div`
  display: block;
  font-size:20px;
  padding:5px;

`


const Profile = () => {
  const MyPost = [{ post: 'light10' }, { post: 'light11' }, {post: 'light12'}]
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>마이페이지 | Hanatai</title>
      </Head>
      <AppLayout>
          <Logo>| My Page</Logo>
          <MyInfo />
      </AppLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context)=>{
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch(END); // 이게있어야 석세스까지 하고 들고옴
  await context.store.sagaTask.toPromise();// 이게있어야 석세스까지 하고 들고옴
});


export default Profile;