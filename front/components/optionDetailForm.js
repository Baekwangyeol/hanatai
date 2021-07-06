import React, { useState, useCallback,useEffect } from 'react';
import { Form,Row,Col, Input,Button} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { ADD_DETAIL_REQUEST } from '../reducers/option';

const FormInput = styled(Form)`
padding: 24px;
background: #fbfbfb;
border: 1px solid #d9d9d9;
border-radius: 2px;
`;

const optionDetailForm = ({ option }) =>{
  const dispatch = useDispatch();
    const { addDetailDone } = useSelector((state) => state.option);
    const [detail, setDetail] = useState('');
    const [form] = Form.useForm();
    const [adult, setAdult] = useState('');
    const [child, setChild] = useState('');

    useEffect(() => {
      if (addDetailDone) {
        setAdult('');
        setChild('');
        setDetail('');
      }
    }, [addDetailDone]);

    const onChangeDetail = useCallback((e) => {
        setDetail(e.target.value);
    }, [detail]);

    const onChangeAdult = useCallback((e) => {
        setAdult(e.target.value);
    }, [adult]);

    const onChangeChild = useCallback((e) => {
        setChild(e.target.value);
    }, [child]);

    const onSubmitForm = useCallback(() => {
      dispatch({
        type: ADD_DETAIL_REQUEST,
        data: { detail, adult, child, optionId : option.id},
   });
    }, [detail, adult, child]);
  

    return (
    <>
      <FormInput
      form={form}
      onFinish={onSubmitForm}
    >
     <Row gutter={24}>
            <Col span={4} >
              <Form.Item
                label='Detail'
              >
                <Input onChange={onChangeDetail} placeholder="Detail" value={detail} />
              </Form.Item>
            </Col>
            <Col span={4} >
              <Form.Item
                label='Adult'
              >
                <Input onChange={onChangeAdult} type="number" placeholder="adult" value={adult} />
              </Form.Item>
            </Col>
            <Col span={4} >
              <Form.Item
                label='Child'
              >
                <Input onChange={onChangeChild} type="number" placeholder="child" value={child} />
              </Form.Item>
            </Col>
            <Col span={4} >
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

export default optionDetailForm;
