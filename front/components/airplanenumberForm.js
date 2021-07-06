import React, { useState, useCallback } from 'react';
import { Button, Form, Row, Col, Input, Select, Modal } from 'antd';
import styled from 'styled-components';
import { useDispatch} from 'react-redux';
import { ADD_AIRPLANENUMBER_REQUEST } from '../reducers/airplane';

const FormInput = styled(Form)`
padding: 24px;
background: #fbfbfb;
border: 1px solid #d9d9d9;
border-radius: 2px;
`;

function error(err) {
  Modal.error({
    content: err,
  });
}

const airplanenumberForm = ({ airplane }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [number, setNumber] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [arriveTime, setArriveTime] = useState('');
  const [departureSpace, setDepartureSpace] = useState('');
  const [arriveSpace, setArriveSpace] = useState('');

  const onChangeNumber = useCallback((e) => {
    setNumber(e.target.value);
  }, [number]);
  const onChangeDepartureTime = useCallback((e) => {
    setDepartureTime(e.target.value);
  }, [departureTime]);
  const onChangeArriveTime = useCallback((e) => {
    setArriveTime(e.target.value);
  }, [arriveTime]);
  const onChangeDepartureSpace = useCallback((e) => {
    setDepartureSpace(e.target.value);
  }, [departureSpace]);
  const onChangeArriveSpace = useCallback((e) => {
    setArriveSpace(e.target.value);
  }, [arriveSpace]);
 
  const onSubmitForm = useCallback(() => {
      if(!departureTime || !arriveTime || !departureSpace || !arriveSpace){
        return error('빈칸기입해주세요');
      }
    dispatch({
      type: ADD_AIRPLANENUMBER_REQUEST,
      data: { flight: airplane.code+number, departureTime, arriveTime,departureSpace,arriveSpace,airplaneId:airplane.id}
  });
  }, [number, departureTime,arriveTime,departureSpace,arriveSpace]);

  return (
    <>
  <FormInput
      form={form}
      onFinish={onSubmitForm}
    >
     <Row gutter={24}>
          <Col span={6} >
              <Form.Item
                name='number'
                label='FlightNumber'
              >
                <Input type="number" onChange={onChangeNumber} placeholder="Flight" />
              </Form.Item>
            </Col>
            <Col span={6}  >
              <Form.Item
                name='departureTime'
                label='DepartureTime'
              >
             <Input onChange={onChangeDepartureTime} placeholder="DepartureTime" />
              </Form.Item>
            </Col>
            <Col span={6}  offset={1}>
              <Form.Item
                name='arriveTime'
                label='ArriveTime'
              >
             <Input onChange={onChangeArriveTime} placeholder="ArriveTime" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
          <Col span={6} offset={6}  >
              <Form.Item
                name='departureSpace'
                label='DepartureSpace'
              >
             <Input onChange={onChangeDepartureSpace} placeholder="DepartureSpace" />
              </Form.Item>
            </Col>
            <Col span={6} offset={1} >
              <Form.Item
                name='arriveSpace'
                label='ArriveSpace'
              >
             <Input onChange={onChangeArriveSpace} placeholder="ArriveSpace" />
              </Form.Item>
            </Col>
            </Row>
            <Row>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">
            register
          </Button>
          <Button
            style={{ margin: '0 8px' }}
            onClick={() => {
              form.resetFields();
              setNumber('');
              setDepartureTime('');
              setArriveTime('');
              setDepartureSpace('');
              setArriveSpace('');
            }}
          >
            Clear
          </Button>
        </Col>
      </Row>
    </FormInput>
    </>
  );
};

export default airplanenumberForm;