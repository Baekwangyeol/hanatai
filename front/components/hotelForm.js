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

const HotelForm = () => {
  const dispatch = useDispatch();
  const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);


  const onChangeCountry = useCallback((e)=>{
    setCountry(e.target.value);
  },[country]);

  const onChangeRegion = useCallback((e)=>{
    setRegion(e.target.value);
  },[region]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOK = () => {
    setIsModalVisible((prev) => !prev);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onSubmitForm = useCallback(() => {
    console.log(country,region);
    // dispatch({
    //   type: ADD_POST_REQUEST,
    //   data: { Code, checkInDate, hotel, roomType, adult, child },
    // });
  }, [country,region]);

  return (
    <>
      <BookingDiv>
        <BookingButton type="primary" onClick={showModal}>
          지역추가
        </BookingButton>
      </BookingDiv>
      <Modal
        title="지역추가"
        visible={isModalVisible}
        onCancel={handleCancel}
        destroyOnClose={true}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button type="primary" form="myForm" key="submit" htmlType="submit" onClick={handleOK}>
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
          <Form.Item label="ADD">
            <Form.Item name="country" style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}>
              <Input type="text" placeholder="Country" onChange={onChangeCountry} value={country} />
            </Form.Item>
            <Form.Item name="Region" style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}>
              <Input type="text" placeholder="Region" onChange={onChangeRegion} value={region}/>
            </Form.Item>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default HotelForm;