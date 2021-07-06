import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import axios from 'axios';
import { Table,Button,Modal } from 'antd';
import { END } from 'redux-saga';
import AppLayout from '../components/AppLayout';
import AirplaneForm from '../components/airplaneForm';
import AirplaneContent from '../components/airplaneContent';
import styled from 'styled-components';
import wrapper from '../store/configureStore';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import { LOAD_AIRPLANE_REQUEST } from '../reducers/airplane';


const BookingDiv = styled.div`
  display:inline-block;
  width:100%;
`;

const BookingButton = styled(Button)`
  margin-bottom : 5px;
  float:right;
  margin-right: 5px;
`;
const columns = [
  { title: 'FlightName',
    dataIndex: 'name',
    key: 'id' },
  { title: 'Code', dataIndex: 'code', key: 'id' },
];

function error(error) {
  Modal.error({
    content: error,
  });
}
const Airplane = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(1);
  const { me } = useSelector((state) => state.user);
  const { airplanePost, hasmorePosts, loadAirplanesLoading,addAirplaneDone,addAirplaneError,addAirplaneNumberError} = useSelector((state) => state.airplane);
  const [FormOpend, setFormOpend] = useState(false);
  const onToggleCompany = useCallback(() => {
    setFormOpend((prev) => !prev);
  }, []);

  useEffect(() => {
    if (!(me && me.id)) {
      Router.replace('/login');
    }
  }, [me && me.id]);

  useEffect(() => {
    if(addAirplaneError) {
        error(addAirplaneError);
    }else if(addAirplaneNumberError){
    error(addAirplaneNumberError);
    }else if(addAirplaneDone){
      setFormOpend(false);
    }
 }, [addAirplaneError,addAirplaneNumberError,addAirplaneDone]);

  const onScroll = useCallback(() => {
    if (hasmorePosts && !loadAirplanesLoading) {
        const lastId = airplanePost[airplanePost.length - 1]?.id;
        dispatch({
          type: LOAD_AIRPLANE_REQUEST,
          lastId,
        });
      }
    if(!hasmorePosts){
        error();
    }
  },[airplanePost, loadAirplanesLoading, hasmorePosts]);
  
  return (
    <AppLayout>
      <BookingDiv>
        <BookingButton onClick={onToggleCompany}>{FormOpend === true ? '추가 닫기' : '항공 추가'}</BookingButton>
      </BookingDiv>
      { FormOpend && (<AirplaneForm />)}
       <Table
        bordered
        className="components-table-demo-nested"
        columns={columns}
        expandedRowRender={(rec) => <AirplaneContent airplane={rec}/>}
        dataSource={airplanePost}
        pagination={false}
        rowKey={(record) => record.id}
        />
      <Button onClick={onScroll}>더보기</Button>
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
    type: LOAD_AIRPLANE_REQUEST,
  });
  context.store.dispatch(END); // 이게있어야 석세스까지 하고 들고옴
  await context.store.sagaTask.toPromise();// 이게있어야 석세스까지 하고 들고옴
});

export default Airplane;