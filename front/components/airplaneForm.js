import React, { useState, useCallback } from 'react';
import { Button, Form, Row, Col, Input, Select, Modal } from 'antd';
import styled from 'styled-components';
import { useDispatch} from 'react-redux';
import { ADD_AIRPLANE_REQUEST } from '../reducers/airplane';

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

const airplaneForm = ({ hotel }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [name, setName] = useState('');
  const [code, setCode] = useState('');

  const onChangeName = useCallback((e) => {
    setName(e.target.value);
  }, [name]);
  const onChangeCode = useCallback((e) => {
    setCode(e.target.value);
  }, [code]);
 
  const onSubmitForm = useCallback(() => {
    if(name == ''){
      return error('항공이름 입력해주세요');
    }else if(code == ''){
      return error('항공코드 입력해주세요');
    }
    dispatch({
      type: ADD_AIRPLANE_REQUEST,
      data: { name, code }
  });
  }, [name, code]);

  return (
    <>
  <FormInput
      form={form}
      onFinish={onSubmitForm}
    >
     <Row gutter={24}>
          <Col span={6} >
              <Form.Item
                name='name'
                label='Flight'
              >
                <Input onChange={onChangeName} placeholder="Flight" />
              </Form.Item>
            </Col>
            <Col span={6}  >
              <Form.Item
                name='code'
                label='code'
              >
             <Input onChange={onChangeCode} placeholder="Code" />
              </Form.Item>
            </Col>
            <Col span={6} >
          <Button type="primary" htmlType="submit">
            register
          </Button>
          <Button
            style={{ margin: '0 8px' }}
            onClick={() => {
              form.resetFields();
              setName('');
              setCode('');
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

export default airplaneForm;