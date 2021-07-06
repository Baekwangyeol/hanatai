import React, { useCallback, useState } from 'react';
import { Descriptions, Input, Form, Button,Select,List} from 'antd';
import {useSelector, useDispatch} from 'react-redux';
import styled, { createGlobalStyle } from 'styled-components';
import axios from 'axios';
import MessengerForm from './messengerForm';
import MessengerList from './messengerList';
import TelForm from './telForm';
import TelList from './telList';

const { Item } = Descriptions;

const BookingDiv = styled.div`
  display:inline-block;
  width:100%;
`;

const BookingButton = styled(Button)`
  margin-bottom : 5px;
  float:right;
  margin-right: 5px;
`;

const ListDiv = styled.div`
  display: flex;
  margin-top:10px;
`;

const MessengerLi = styled(List)`
  width: 300px;
  margin-right: 10px;
  display:inline-block;
  margin-bottom:15px;
`;

const TelLi = styled(List)`
  width: 300px;
  margin-right: 10px;
  display:inline-block;
  margin-bottom:15px;
`;

const Global = createGlobalStyle`
    tr.ant-table-expanded-row .ant-descriptions-view table{
        width:100%;
    }
`

const contactInfo = ({ contact }) => {
  const [MessengerOpend, setMessengerOpend] = useState(false);
  const [TelOpend, setTelOpend] = useState(false);


  const onToggleMessenger = useCallback(() => {
    setMessengerOpend((prev) => !prev);
  }, []);

  const onToggleTel = useCallback(() => {
    setTelOpend((prev) => !prev);
  }, []);


  return (
    <>
      <Global />
      <BookingDiv>
        <BookingButton onClick={onToggleMessenger}>{MessengerOpend === true ? '추가 닫기' : '메신저 추가'}</BookingButton>
        <BookingButton onClick={onToggleTel}>{TelOpend === true ? '추가 닫기' : '전화번호 추가'}</BookingButton>
      </BookingDiv>
      <Descriptions >
        <Item label="Name" span={3} >{contact.name}</Item>
        <Item label="Company" span={3}>{contact.Company.company}</Item>
        <Item label="Position" span={3}>{contact.position}</Item>
        <Item label="Email" >{contact.email}</Item>
      </Descriptions>
      <ListDiv>
     <MessengerLi
     header={<div>Messenger</div>}
     bordered
     itemLayout="horizontal"
     dataSource={contact.Accounts}
     renderItem={item => (
        <MessengerList account={item} />
      )}
     />
      <TelLi
     header={<div>Tel</div>}
     bordered
     itemLayout="horizontal"
     dataSource={contact.Tels}
     renderItem={item => (
        <TelList tel={item} />
      )}
     />
     </ListDiv>
     <br/>
      { MessengerOpend && (<MessengerForm contact={contact} />)}
     <br/>
      { TelOpend && ( <TelForm contact={contact}/>)}
     
    </>
  );
};

export default contactInfo;
