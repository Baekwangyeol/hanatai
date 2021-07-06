import React,{ useCallback, useState,useEffect } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { Table,Button } from 'antd';
import PropTypes from 'prop-types';
import AirplaneNumberForm from './airplanenumberForm';
import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';

const Global = createGlobalStyle`
    tr.ant-table-expanded-row .ant-descriptions-view table{
        width:100%;
    }
`;
const BookingDiv = styled.div`
  display:inline-block;
  width:100%;
`;

const BookingButton = styled(Button)`
  margin-bottom : 5px;
  float:right;
  margin-right: 5px;
`;

const column = [
  { title: 'FlightNumber',
    dataIndex: 'number',
    key: 'id',
  },
  { title: 'DepartureTime', dataIndex: 'departureTime', key: 'id' },
  { title: 'ArriveTime', dataIndex: 'arriveTime', key: 'id' },
  { title: 'DepartureSpace', dataIndex: 'departureSpace', key: 'id' },
  { title: 'ArriveSpace', dataIndex: 'arriveSpace', key: 'id' },
];

const airplaneContent = ({ airplane }) => {
  const [FormOpend, setFormOpend] = useState(false);
  const { addAirplaneNumberDone } = useSelector((state) => state.airplane);

  useEffect(() => {
    if(addAirplaneNumberDone){
      setFormOpend(false);
    }
  }, [addAirplaneNumberDone])
  const onToggleCompany = useCallback(() => {
    setFormOpend((prev) => !prev);
  }, []);

  return (
    <>
      <Global />
      <BookingDiv>
        <BookingButton onClick={onToggleCompany}>{FormOpend === true ? '추가 닫기' : '항공 추가'}</BookingButton>
      </BookingDiv>
      { FormOpend && (<AirplaneNumberForm airplane={airplane} />)}
       <Table
        bordered
        className="components-table-demo-nested"
        columns={column}
        dataSource={airplane.airnumbers}
        pagination={false}
        rowKey={(record) => record.id}
      /> 
    </>
  );
};


export default airplaneContent;