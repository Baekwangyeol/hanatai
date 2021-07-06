import React, { useState,useCallback,useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { Modal, Button,Input, Form,Select } from 'antd';
import styled from 'styled-components';
import { ADD_COUNTRY_REQUEST,ADD_REGION_REQUEST,ADD_MESSENGER_REQUEST } from '../reducers/addother';

const BookingDiv =styled.div`
  display:inline-block;
  width:100%;
`;

const BookingButton = styled(Button)`
  margin-bottom : 5px;
  float:right;
  margin-right: 5px;
`;

const addotherForm = () => {
  const dispatch = useDispatch();
  const [addother, setAddother] = useState('');
  const [Option, setOption] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  const onChangeAddother = useCallback((e) => {
    setAddother(e.target.value);
  },[addother]);
  
  const onChangeOption = useCallback((e) => {
    setOption(e);
  },[]);
  
  const showModal = () => {
    setIsModalVisible((prev) => !prev);
  };

  const handleOK = () => {
    setIsModalVisible((prev) => !prev);
  };

  const handleCancel = () => {
    setIsModalVisible((prev) => !prev);
  };

  const onSubmitForm = useCallback((e) => {
      if(Option === 'country'){
        dispatch({
             type: ADD_COUNTRY_REQUEST,
          data :{ addother }
     });   
      }else if(Option === 'region'){
        dispatch({
            type: ADD_REGION_REQUEST,
         data :{addother }
    });   
      }else if(Option === 'messenger'){
        dispatch({
            type: ADD_MESSENGER_REQUEST,
         data :{ addother }
    });   
      }
  }, [Option,addother]);

  return (
    <>
      <BookingDiv>
        <BookingButton type="primary" onClick={showModal}>
          추가하기
        </BookingButton>
      </BookingDiv>
      <Modal
        title="추가하기"
        visible={isModalVisible}
        onCancel={handleCancel}
        destroyOnClose={true}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button type="primary" form="myForm" key="submit" htmlType="submit"  onClick={handleOK}>
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
            <Form.Item name="what" style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}>
              <Select placeholder="what" onChange={onChangeOption} value={Option}>
                      <Select.Option value='country'>country</Select.Option>
                      <Select.Option value='region'>region</Select.Option>
                      <Select.Option value='messenger'>messenger</Select.Option>
                    </Select>
            </Form.Item>
            <Form.Item name="addother" style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}>
              <Input  onChange={onChangeAddother} value={addother} />
            </Form.Item>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default addotherForm;