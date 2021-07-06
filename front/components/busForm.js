import React,{useState,useEffect, useCallback } from 'react';
import { Form,Modal,Row,Col,Input,Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { ADD_BUS_REQUEST } from '../reducers/bus';

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
  

const busForm = () =>{
    const dispatch = useDispatch();
    const [bus, setBus] = useState('');
    const [form] = Form.useForm();
    const { addBusDone } = useSelector((state) => state.bus);

    useEffect(() => {
      if (addBusDone) {

      }
    }, [addBusDone]);

    const onChangeBus = useCallback((e) => {
        setBus(e.target.value);
    }, [bus]);

    const onSubmitForm = useCallback(() => {
      if(bus === ''){
        return error('빈칸 작성해주세요');
      }
      dispatch({
        type:ADD_BUS_REQUEST,
        data: { bus }
      })
    }, [bus]);
  
    return(
        <>
          <FormInput
             form={form}
             onFinish={onSubmitForm}
            >
     <Row gutter={24}>
          <Col span={6} >
              <Form.Item
                label='Bus'
              >
                <Input onChange={onChangeBus} placeholder="bus" value={bus} />
              </Form.Item>
            </Col>
            <Col span={5} >
          <Button type="primary" htmlType="submit">
            register
          </Button>
          <Button
            style={{ margin: '0 8px' }}
            onClick={() => {
              form.resetFields();
            }}
          >
            Clear
          </Button>
        </Col>
            </Row>
    </FormInput>
        </>
    )
}

export default busForm;