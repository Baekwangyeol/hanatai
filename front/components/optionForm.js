import React,{useState,useCallback,useEffect} from 'react';
import { Button, Form, Row, Col, Input, Select, Modal } from 'antd';
import styled from 'styled-components';
import { useSelector, useDispatch} from 'react-redux';
import { ADD_OPTION_REQUEST } from '../reducers/option';


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
  
const optionForm = () =>{
    const dispatch = useDispatch();
    const { addOptionDone,addOptionError } =useSelector((state) => state.booking);
    const [option, setOption] = useState('');
    const [detail, setDetail] = useState('');
    const [form] = Form.useForm();
    const [adult, setAdult] = useState('');
    const [child, setChild] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
      if (addOptionDone) {
        setAdult('');
        setChild('');
        setOption('');
        setContent('');
        setDetail('');
      }
    }, [addOptionDone]);

    const onChangeOption = useCallback((e) => {
        setOption(e.target.value);
    }, [option]);

    const onChangeDetail = useCallback((e) => {
        setDetail(e.target.value);
    }, [detail]);

    const onChangeAdult = useCallback((e) => {
        setAdult(e.target.value);
    }, [adult]);

    const onChangeChild = useCallback((e) => {
        setChild(e.target.value);
    }, [child]);
    
    const onChangeContent = useCallback((e) => {
        setContent(e.target.value);
    }, [content]);

    const onSubmitForm = useCallback(() => {
      if((detail || adult || child ) === ''){
        return dispatch({
               type: ADD_OPTION_REQUEST,
               data: { option, content },
              });
      }else if((detail && adult && child ) === ''){
        return error('Detail,Adult,Child 전부 넣어거나 다빼주세요')
      }
      dispatch({
        type: ADD_OPTION_REQUEST,
        data: { option, detail, adult, child, content },
   });
    }, [option, detail, adult, child, content]);
  
    return (
         <>
              <FormInput
      form={form}
      onFinish={onSubmitForm}
    >
     <Row gutter={24}>
          <Col span={6} >
              <Form.Item
                label='Option'
              >
                <Input onChange={onChangeOption} placeholder="option" value={option} />
              </Form.Item>
            </Col>
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
       
            </Row>
            <Row>
            <Col span={6} >
              <Form.Item
                label='Content'
              >
                <Input.TextArea onChange={onChangeContent} value={content} />
              </Form.Item>
            </Col>
            <Col span={4} offset={20}>
          <Button type="primary" htmlType="submit">
            register
          </Button>
          <Button
            style={{ margin: '0 8px' }}
            onClick={() => {
              form.resetFields();
              setContent('');
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

export default optionForm;