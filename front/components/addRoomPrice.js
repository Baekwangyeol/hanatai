import React, { useState,useCallback,useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { Modal, Button,Input, DatePicker, Form } from 'antd';
import styled from 'styled-components';
import { ADD_PRICE_REQUEST } from '../reducers/hotel';

const BookingDiv =styled.div`
  display:inline-block;
  width:100%;
`;

const BookingButton = styled(Button)`
  margin-bottom : 5px;
  float:right;
  margin-right: 5px;
`;

function success(data) {
  Modal.success({
    content: data,
  });
}

function error(err) {
    Modal.error({
      content: err,
    });
  }

const AddRoomPrice = ({ roomtype }) => {
  const dispatch = useDispatch();
  const { addPriceDone,addPriceError } = useSelector((state) => state.hotel);
  const RangePicker = DatePicker.RangePicker;
  const [roomPrice, setRoomprice] = useState('');
  const [extraBed, setExtrabed] = useState('');
  const [extraPerson, setExtraPerson] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [periodStart, setPeriodStart] = useState('');
  const [periodEnd, setPeriodEnd] = useState('');

 
  const handleCancel = () => {
    setRoomprice('');
    setPeriodStart('');
    setPeriodEnd('');
    setExtrabed('');
    setExtraPerson('');
    setIsModalVisible(false);
  };

  const onChangeDate = useCallback((e, v) => {
    setPeriodStart(v[0]);
    setPeriodEnd(v[1]);
    console.log(periodStart,periodEnd);
  }, [periodStart, periodEnd]);

  const onChangeRoomprice = useCallback((e)=>{
    setRoomprice(e.target.value);
  },[roomPrice]);

  const onChangeExtraBed = useCallback((e)=>{
    setExtrabed(e.target.value);
  },[extraBed]);
  
  const onChangeExtraPerson = useCallback((e)=>{
    setExtraPerson(e.target.value);
  },[extraPerson]);
  
  const showModal = () => {
    setIsModalVisible(true);
  };

  const onSubmitForm = useCallback(() => {
      console.log(roomPrice,periodStart,periodEnd,extraPerson,extraBed,roomtype.id);
      if(!roomPrice && !periodEnd && !periodEnd ){
          return error('가격 기간 입력해주세요')
      }
    dispatch({
      type: ADD_PRICE_REQUEST,
      data: { roomPrice, periodStart, periodEnd, extraPerson, extraBed, roomtypeId: roomtype.id },
    });
    handleCancel();
  }, [roomPrice, periodStart, periodEnd, extraBed, extraPerson]);


  return (
    <>
      <BookingDiv>
        <BookingButton type="primary" onClick={showModal}>
          추가
        </BookingButton>
      </BookingDiv>
      <Modal
        destroyOnClose={true}
        title="가격추가 $기준"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
            <Button type="primary" form="myForm" key="submit" htmlType="submit">
            Submit
          </Button>,
         <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
        ]}
      >
        <Form
          id="myForm"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 14 }}
          onFinish={onSubmitForm}
          >
          <Form.Item name="roomPrice" label="RoomPrice"  wrapperCol={{ span: 5 }}>
            <Input type="number" onChange={onChangeRoomprice} value={roomPrice} />
          </Form.Item>
          <Form.Item name="extraBed" label="extraBed"  wrapperCol={{ span: 5 }}>
            <Input type="number" onChange={onChangeExtraBed} value={extraBed} />
          </Form.Item>
          <Form.Item name="extraPerson" label="extraPerson"  wrapperCol={{ span: 5 }}>
            <Input type="number" onChange={onChangeExtraPerson} value={extraPerson} />
          </Form.Item>
          <Form.Item name="period" label="period">
            <RangePicker
              onChange={onChangeDate}
              value={[periodStart, periodEnd]} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddRoomPrice;