import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import axios from 'axios';
import { Typography,Table,Button,Modal,Popconfirm,Switch  } from 'antd';
import { END } from 'redux-saga';
import styled from 'styled-components';
import AppLayout from '../components/AppLayout';
import AddotherForm from '../components/addotherForm';
import wrapper from '../store/configureStore';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import { LOAD_COUNTRY_REQUEST, LOAD_REGION_REQUEST, REMOVE_COUNTRY_REQUEST,LOAD_MESSENGER_REQUEST } from '../reducers/addother';

 
const Tablediv = styled.div`
display:inline-block;
float:left;
margin-right:8px;
width:${(props) => props.width || 100};
`;

const ButtonT = styled(Button)`
margin-left: 10px;
margin-top:8px;
`;


const columns1 = [
    { title: '지역', dataIndex: 'region', key: 'id' },
  ];
  const columns2 = [
    { title: '메신저', dataIndex: 'messenger', key: 'id' },
  ];
  const columns3 = [
    { title: '나라', dataIndex: 'country', key: 'id' },
  ];




const Addother = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { countryPost, regionPost, messengerPost,addRegionError,addMessengerError } = useSelector((state) => state.addother);
  const [delbtn, setdelbtn] = useState(false);
  const [columns,setColumns] =useState(columns3);
  const [tablewidth,setTablewidth] = useState(100);

  function error(error) {
    Modal.error({
      content: error,
    });
  }
  
  useEffect(() => {
    if (!(me && me.id)) {
      Router.replace('/login');
    }
  }, [me && me.id]);

  useEffect(() => {
    if (addRegionError) {
      error(addRegionError);
    } else if (addMessengerError) {
      error(addMessengerError);
    }
  }, [addRegionError, addMessengerError]);

  


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
  },[]);


  const delAddColumn = (checked) =>{
    const standardcolumns = [...columns3];
    if (checked) {
      const newColumn = {
        title: '삭제',
        dataIndex: 'operation',
        render: (_, record)  =>
            countryPost.length >= 1 ? (
            <Popconfirm title="삭제하시겠습니까?" 
            onConfirm={()=>{handleDelete(record.id)} }
            okText="Yes"
            cancelText="No"
            >
              <a>Delete</a>
            </Popconfirm>
          ) : null,
    }
    setColumns([...standardcolumns, newColumn]);
  }else{
    setColumns(standardcolumns);
  }
  };

  const handleDelete = (key) => {
    console.log(key);
    dispatch({
      type: REMOVE_COUNTRY_REQUEST,
      data: key,
    });
  }


  const data = [];
  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i,
      name: 'Screem'+i,
      platform: 'iOS',
      version: '10.3.4.5654',
      upgradeNum: 500,
      creator: 'Jack',
      createdAt: '2014-12-24 23:12:00',
    });
  }

  return (
    <AppLayout>
      <Switch 
      checkedChildren="nomal"
      unCheckedChildren="Delete"
      onChange={delAddColumn}/>
      <AddotherForm />
      <Tablediv width={tablewidth}>
      <Table
        bordered
      className="components-table-demo-nested"
      columns={columns}
      dataSource={countryPost}
      pagination={false}
    />
    <ButtonT type="primary" onClick={onScroll}>더보기</ButtonT> 
    </Tablediv>
    <Tablediv>
      <Table
        bordered
      className="components-table-demo-nested"
      columns={columns1}
      dataSource={regionPost}
      pagination={false}
    />
    <ButtonT type="primary" onClick={onScroll}>더보기</ButtonT> 
    </Tablediv>
    <Tablediv>
      <Table
        bordered
      className="components-table-demo-nested"
      columns={columns2}
      dataSource={messengerPost}
      pagination={false}
    />
     <ButtonT type="primary" onClick={onScroll}>더보기</ButtonT> 
   </Tablediv>
    
    </AppLayout>
  );
}

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
    type: LOAD_COUNTRY_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_REGION_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_MESSENGER_REQUEST,
  });
  context.store.dispatch(END); // 이게있어야 석세스까지 하고 들고옴
  await context.store.sagaTask.toPromise();// 이게있어야 석세스까지 하고 들고옴
});

export default Addother;