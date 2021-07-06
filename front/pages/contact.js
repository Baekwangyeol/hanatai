import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import axios from 'axios';
import { List,Button } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import { END } from 'redux-saga';
import AppLayout from '../components/AppLayout';
import ContactList from '../components/contactList';
import wrapper from '../store/configureStore';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import { LOAD_CONTACT_REQUEST } from '../reducers/contact';
import { LOAD_COUNTRY_REQUEST, LOAD_MESSENGER_REQUEST } from '../reducers/addother';

const BookingDiv = styled.div`
  display:inline-block;
  width:100%;
`;

const BookingButton = styled(Button)`
  margin-bottom : 5px;
  float:right;
  margin-right: 5px;
`;

 
const Contact = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { contactPost } = useSelector((state) => state.contact);
  
  useEffect(() => {
    if (!(me && me.id)) {
      Router.replace('/login');
    }
  }, [me && me.id]);

//  function error() {
//     Modal.error({
//       content: '더불러올것이 없습니다.',
//     });
//   }

//   const onScroll = useCallback(() => {
//     if (hasmorePosts && !loadAirplanesLoading) {
//         const lastId = airplanePost[airplanePost.length - 1]?.id;
//         dispatch({
//           type: LOAD_AIRPLANE_REQUEST,
//           lastId,
//         });
//       }
//     if(!hasmorePosts){
//         error();
//     }

  return (
    <AppLayout>
        <BookingDiv>
        <BookingButton type="primary">
        <Link href='/contact/form'><a>등록하기</a></Link>
        </BookingButton>
      </BookingDiv>

      {/* <Button onClick={onScroll}>더보기</Button> */}
      <List
     header={<div>연락처</div>}
     bordered
     itemLayout="horizontal"
     dataSource={contactPost}
     renderItem={item => (
        <ContactList contact={item} />
    )}
  /> 
    </AppLayout>
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
  context.store.dispatch({
    type: LOAD_CONTACT_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_COUNTRY_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_MESSENGER_REQUEST,
  });
  context.store.dispatch(END); // 이게있어야 석세스까지 하고 들고옴
  await context.store.sagaTask.toPromise();// 이게있어야 석세스까지 하고 들고옴
});

export default Contact;