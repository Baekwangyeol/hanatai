import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import styled from 'styled-components';
import { Button, Table } from 'antd';
import { END } from 'redux-saga';
import AppLayout from '../components/AppLayout';
import wrapper from '../store/configureStore';
import CompanyContent from '../components/companyContent';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import { LOAD_COMPANY_REQUEST } from '../reducers/company';
import { LOAD_OPTION_REQUEST } from '../reducers/option';

const BookingDiv = styled.div`
  display:inline-block;
  width:100%;
`;

const BookingButton = styled(Button)`
  margin-bottom : 5px;
  float:right;
  margin-right: 5px;
`;

const Company = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { companyPost } = useSelector((state) => state.company);

  const columns = [
    { title: 'Company',
      dataIndex: 'company',
      key: 'id'},
    { title: 'Address', dataIndex: 'address', key: 'id' },
    { title: 'Business', dataIndex: 'business', key: 'id' },
  ];

  useEffect(() => {
    if (!(me && me.id)) {
      Router.replace('/login');
    }
  }, [me && me.id]);

  return (
    <AppLayout>
        <BookingDiv>
        <BookingButton type="primary">
        <Link href='/company/form'><a>등록하기</a></Link>
        </BookingButton>
      </BookingDiv>
      <Table
        bordered
      className="components-table-demo-nested"
      columns={columns}
      expandedRowRender={(rec) => <CompanyContent company={rec}/>}
      dataSource={companyPost}
      pagination={false}
      rowKey={(record) => record.id}
    />
    </AppLayout>
  );
};
{/* <CompanyContent company={company}/>  */}
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
    type: LOAD_COMPANY_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_OPTION_REQUEST,
  });
  context.store.dispatch(END); // 이게있어야 석세스까지 하고 들고옴
  await context.store.sagaTask.toPromise();// 이게있어야 석세스까지 하고 들고옴
});

export default Company;