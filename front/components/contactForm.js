import React, { useState,useCallback,useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { Modal, Button,Input, Form,Space,Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const BookingDiv =styled.div`
  display:inline-block;
  width:100%;
`;

const BookingButton = styled(Button)`
  margin-bottom : 5px;
  float:right;
  margin-right: 5px;
`;

const ContactForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  
  const [isModalVisible, setIsModalVisible] = useState(false);
 

  const onChangeName = useCallback((e)=>{
    setName(e.target.value);
  },[name]);



  const showModal = () => {
    setIsModalVisible((prev) => !prev);
  };

  const handleOK = () => {
    setIsModalVisible((prev) => !prev);
  };

  const handleCancel = () => {
    setIsModalVisible((prev) => !prev);
  };

  const onSubmitForm = useCallback((values) => {
    console.log(values);
  }, []);

  return (
    <>
      <BookingDiv>
        <BookingButton type="primary" onClick={showModal}>
          연락처등록
        </BookingButton>
      </BookingDiv>
      <Modal
        title="등록하기"
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
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          onFinish={onSubmitForm}
          >
          <Form.Item name="name" label="Name">
            <Input type="text" onChange={onChangeName} value={name} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset:2 }}>
            <Form.List name="tel">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(field => (
                    <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                      <Form.Item
                        name={[field.name, 'TEL']}
                        fieldKey={[field.fieldKey, 'first']}
                        label={'TEL'+ field.key}
                      >
                        <Input placeholder="Tel" />
                       </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(field.name)} />
                    </Space>
                  ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                ADD TEL
              </Button>
            </Form.Item>
          </>
        )}
            </Form.List>
            <Form.List name="message">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(field => (
                   <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                   <Form.Item
                     {...field}
                     name={[field.name, 'messenger']}
                     fieldKey={[field.fieldKey, 'first']}
                     label={'messengerID'+ field.key}
                   >
                    <Select placeholder="messenger" >
                      <Select.Option value='KakaoTalk'>KakaoTalk</Select.Option>
                      <Select.Option value='NateOn'>NateOn</Select.Option>
                    </Select>
                   </Form.Item>
                   <Form.Item
                     {...field}
                     name={[field.name, 'messengerId']}
                     fieldKey={[field.fieldKey, 'last']}
                   >
                     <Input placeholder="messengerId" />
                   </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(field.name)} />
                    </Space>
                  ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                ADD messageId
              </Button>
            </Form.Item>
          </>
        )}
            </Form.List>
          </Form.Item>
            
        </Form>
      </Modal>
    </>
  );
};

export default ContactForm;