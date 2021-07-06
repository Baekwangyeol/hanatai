import React, { useState, useCallback} from 'react';
import { Button, Form, Row, Col, Input, Select, Modal } from 'antd';
import styled from 'styled-components';
import { useSelector,useDispatch} from 'react-redux';
import { ADD_ROOMTYPE_REQUEST } from '../reducers/hotel';

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

const roomTypeForm = ({ hotel }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [form] = Form.useForm();
  const [extrabed, setExtrabed] = useState('');
  const [bath, setBath] = useState('');
  const [view, setView] = useState('');
  const [numberOfRoom, setNumberOfRoom] = useState('');
  // const [adult, setAdult] = useState(0);
  // const [child, setChild] = useState(0);
  // const [infant, setInfant] = useState(0);

  const onChangeName = useCallback((e) => {
    setName(e.target.value);
  }, [name]);
  const onChangeExtrabed = useCallback((e) => {
    setExtrabed(e);
  }, [extrabed]);
  const onChangeBath = useCallback((e) => {
    setBath(e);
  }, [bath]);
  const onChangeView = useCallback((e) => {
    setView(e);
  }, [view]);
  const onChangeNumberOfRoom = useCallback((e) => {
    setNumberOfRoom(e.target.value);
  }, [numberOfRoom]);
  // const onChangeAdult = useCallback((e) => {
  //   setAdult(e.target.value);
  // }, [adult]);
  // const onChangeChild = useCallback((e) => {
  //   setChild(e.target.value);
  // }, [child]);
  // const onChangeInfant = useCallback((e) => {
  //   setInfant(e.target.value);
  // }, [infant]);

  const onSubmitForm = useCallback(() => {
    if(name == ''){
      return error('룸타입 기재해주세요');
    }else if(extrabed == ''){
      return error('엑스트라 베드 기입해주세요');
    }
    dispatch({
      type: ADD_ROOMTYPE_REQUEST,
      data: { name, extrabed,view,bath,numberOfRoom, hotelId: hotel.id }
  });
  }, [name, extrabed,numberOfRoom,view,bath]);

  return (
    <>
  <FormInput
      form={form}
      onFinish={onSubmitForm}
    >
     <Row gutter={24}>
          <Col span={8} >
              <Form.Item
                name='name'
                label='RoomType'
              >
                <Input onChange={onChangeName} placeholder="RoomType" />
              </Form.Item>
            </Col>
            <Col span={6} offset={1} >
              <Form.Item
                name='extrabed'
                label='extrabed'
              >
               <Select onChange={onChangeExtrabed} placeholder="extrabed">
                 <Select.Option value="false">False</Select.Option>
                 <Select.Option value="true">True</Select.Option>
               </Select>
              </Form.Item>
            </Col>
            <Col span={6} offset={1}>
              <Form.Item
                name='numberOfRoom'
                label='NumberOfRoom'
              >
                <Input type='number' onChange={onChangeNumberOfRoom}  placeholder="RoomType" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
          <Col span={6} offset={3}>
              <Form.Item
                name='bath'
                label='bath'
              >
               <Select onChange={onChangeBath} placeholder="bath">
                 <Select.Option value="false">False</Select.Option>
                 <Select.Option value="true">True</Select.Option>
               </Select>
              </Form.Item>
            </Col>
            <Col span={6} offset={3} >
              <Form.Item
                name='view'
                label='view'
              >
               <Select onChange={onChangeView} placeholder="view">
                 <Select.Option value="No View">No View</Select.Option>
                 <Select.Option value="Mountain view">Mountain view</Select.Option>
                 <Select.Option value="City View">City View</Select.Option>
                 <Select.Option value="Ocean View">Ocean View</Select.Option>
               </Select>
              </Form.Item>
            </Col>
          {/* <Col span={4}  offset={1}>
              <Form.Item
                name='adult'
                label='adult'
              >
                <Input  type="number"  onChange={onChangeAdult} placeholder="adult" />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item
                name='child'
                label='child'
              >
                <Input type="number" placeholder="child" onChange={onChangeChild} />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item
                name='infant'
                label='infant'
              >
                <Input type="number" placeholder="infant" onChange={onChangeInfant} />
              </Form.Item>
            </Col> */}
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
              setName('');
              setExtrabed(false);
              setAdult(0);
              setChild(0);
              setInfant(0);
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

export default roomTypeForm;