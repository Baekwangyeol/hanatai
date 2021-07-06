import React, { useCallback ,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Input, Row, Col, Layout,Button,Modal } from 'antd';
import styled from 'styled-components';
import { LOG_OUT_REQUEST } from '../reducers/user';
import MyName from './MyName';

const { SubMenu } = Menu;

const { Footer } = Layout;

const MyId = styled.div`
display: flex;
padding:10px;
justify-content: flex-end;
`;

const Title = styled(Col)`
  font-size:30px;
  padding-top:15px;
  padding-left:20px;
   & a{ 
     text-decoration:none;
     color:#e91e63
    };
`;

const MyInfo = styled(Col)`
  right:20px;
  padding:20px;
`;
const MyButton = styled(Button)`
  margin:5px;
`;

const RowPadding = styled(Row)`
    margin-top:10px;
`;

const AppLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { me, logOutLoading } = useSelector((state) => state.user);

  useEffect(() => {
    if (!(me && me.id)) {
      Router.replace('/login');
    }
  }, [me && me.id]);

  const onLogOut = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST,
    });
  }, []);

  return (
    <div>
      <Row>
        <Title xs={24} md={8} span={8}><Link href='/'><a>하나타이</a></Link></Title>
        <MyInfo xs={24} md={8} span={6} offset={8}>
          { me && <MyName />}
          <MyButton>
            <Link href='/profile'><a>마이페이지</a></Link>
          </MyButton>
          <Button onClick={onLogOut} loading={logOutLoading}>로그아웃</Button>
        </MyInfo>
      </Row>
      <Menu mode="horizontal">
        <Menu.Item>
          <Link href='/booking'><a>예약하기</a></Link>
        </Menu.Item>
        <Menu.Item>
          <Link href='/party'><a>공동행사</a></Link>
        </Menu.Item>
        <SubMenu key="SubMenu" title="정보 - 등록">
          <Menu.Item><Link href='/hotel'><a>호텔</a></Link></Menu.Item>
          <Menu.Item><Link href='/airplane'><a>항공</a></Link></Menu.Item>
          <Menu.Item><Link href='/option'><a>옵션</a></Link></Menu.Item>
          <Menu.Item>식당</Menu.Item>
          <Menu.Item><Link href='/company'><a>회사</a></Link></Menu.Item>
        </SubMenu>
        <Menu.Item>
          <Link href='/contact'><a>연락정보망</a></Link>
        </Menu.Item>
        <Menu.Item>
          <Link href='/bus'><a>버스</a></Link>
        </Menu.Item>
        <Menu.Item style={{ float : 'right'}}>
          <Link href='/addother'><a>추가</a></Link>
        </Menu.Item>
       
      </Menu>
      <RowPadding gutter={8}>
        <Col md={2} />
        <Col xs={24} md={20}>
          {children}
        </Col>
      </RowPadding>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;