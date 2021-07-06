import React, { useState,useCallback } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { Modal, Button,Input, DatePicker, Form } from 'antd';
import dayjsDate from 'dayjs';
import styled from 'styled-components';
import { ADD_POST_FAILURE, ADD_POST_REQUEST } from '../reducers/post';

const BookingDiv =styled.div`
  display:inline-block;
  width:100%;
`;

const BookingButton = styled(Button)`
  margin-bottom : 5px;
  float:right;
  margin-right: 5px;
`;

const PostForm = () => {
  const dispatch = useDispatch();
  const RangePicker = DatePicker.RangePicker;
  const dateFormat = dayjsDate().format('YYYY-MM-DD');
  const [Code, setCode] = useState('');
  const [hotel, setHotel] = useState('');
  const [roomType, setRoomType] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [checkInDate, setCheckInDate] = useState(dateFormat);
  const [adult, setAdult] = useState('');
  const [child, setChild] = useState('');

  const onChangeCode = useCallback((e)=>{
    setCode(e.target.value);
    console.log(Code);
  },[Code]);

  const onChangeHotel = useCallback((e)=>{
    setHotel(e.target.value);
    console.log(hotel);
  },[hotel]);

  const onChangeRoomType = useCallback((e) => {
    setRoomType(e.target.value);
    console.log(roomType);
  },[roomType]);

  const onChangeAdult = useCallback((e) => {
    setAdult(e.target.value);
    console.log(adult);
  },[adult]);

  const onChangeChild = useCallback((e)=>{
    setChild(e.target.value);
    console.log(child);
  },[child]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setCheckInDate('');
    setIsModalVisible(false);
  };

  const onChangeDate = useCallback((e, v) => {
    setCheckInDate([v[0],v[1]]);
    console.log(checkInDate);
}, [checkInDate]);

  const onSubmitForm = useCallback(() => {
    console.log(Code, checkInDate, hotel, roomType,adult,child);
    dispatch({
      type: ADD_POST_REQUEST,
      data: { Code, checkInDate, hotel, roomType, adult, child },
    });
  }, [Code, checkInDate, hotel, roomType, adult, child]);

  return (
    <>
      <BookingDiv>
        <BookingButton type="primary" onClick={showModal}>
          예약하기
        </BookingButton>
      </BookingDiv>
      <Modal
        title="예약하기"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button type="primary" form="myForm" key="submit" htmlType="submit">
            Submit
          </Button>
        ]}
      >
        <Form
          id="myForm"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 14 }}
          onFinish={onSubmitForm}
          >
          <Form.Item name="code" label="Code">
            <Input onChange={onChangeCode} value={Code} />
          </Form.Item>
          <Form.Item name="checkInDate" label="CheckInDate">
            <RangePicker
              onChange={onChangeDate}
              value={[checkInDate[0], checkInDate[1]]} />
          </Form.Item>
          <Form.Item name="hotel" label="hotel">
            <Input onChange={onChangeHotel} value={hotel} />
          </Form.Item>
          <Form.Item name="roomtype" label="RoomType">
            <Input onChange={onChangeRoomType} value={roomType} />
          </Form.Item>
          <Form.Item label="Person">
            <Form.Item name="adult" style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}>
              <Input type="number" placeholder="Adult" onChange={onChangeAdult} value={adult} />
            </Form.Item>
            <Form.Item name="child" style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}>
              <Input type="number" placeholder="Child" onChange={onChangeChild} value={child}/>
            </Form.Item>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default PostForm;