import React, { useState, useCallback, useEffect } from 'react';
import Router from 'next/router';
import { END } from 'redux-saga';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Select, Button, Modal,Radio  } from 'antd';
import axios from 'axios';
import styled from 'styled-components';
import AppLayout from '../../components/AppLayout';
import wrapper from '../../store/configureStore';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import { ADD_CONTACT_REQUEST } from '../../reducers/contact';
import { LOAD_COMPANY_REQUEST } from '../../reducers/company';

const formItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 5 },
  };

const Container = styled.div`
    margin-top : 50px;
`;
const Title = styled.div`
    margin-bottom:20px;
    font-size:30px;
    color: blue;
`;
function success() {
  Modal.success({
    content: '등록 성공',
    onOk() { Router.replace('/contact'); },
  });
}

function error(err) {
  Modal.error({
    content: err,
  });
}

const companyForm = () => {
  const { companyPost } = useSelector((state) => state.company);
  const { addContactLoading, addContactDone, addContactError } = useSelector((state) => state.contact);
  

  useEffect(() => {
    if (addContactDone) {
      success();
    } else if (addContactError) {
      error(addContactError);
    }
  }, [addContactDone, addContactError]);
    
    
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [position, setPosition] = useState('');
  const [email, setEmail] = useState('');
  const [work, setWork] = useState('');
  const [company, setCompany] = useState('');

  const onChangeName = useCallback((e) => {
    setName(e.target.value);
  }, [name]);
  const onChangeGender = useCallback((e) => {
    setGender(e.target.value);
  }, [gender]);
  const onChangePosition = useCallback((e) => {
    setPosition(e.target.value);
  }, [position]);
  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, [email]);
  const onChangeWork = useCallback((e) => {
    setWork(e.target.value);
  }, [work]);
  const onChangeCompany = useCallback((value) => {
    setCompany(value);
  }, [company]);

  const onChangeSubmit = useCallback(() => {
    console.log(name,company, gender, position, email, work, company);
    dispatch({
      type: ADD_CONTACT_REQUEST,
      data: { name, gender, position, email, work, company },
    });
  }, [name, gender, position, email, work, company]);

    return(
        <AppLayout>
            <Container>
                <Title>
                    연락처 등록
                    <hr/>
                </Title>
            <Form 
            {...formItemLayout}
            onFinish={onChangeSubmit}>
                <Form.Item  name="name" label="Name">
                   <Input type="text" placeholder="name" onChange={onChangeName} value={name} />
                </Form.Item>
                <Form.Item  label="Company" wrapperCol={{span:12}}>
                  <Form.Item
                    name="company"
                    hasFeedback
                    style={{ display: 'inline-block', width: 'calc(50%)', marginRight: '5px', marginBottom: '0px' }}>
                    <Select placeholder="Please select a country" onChange={onChangeCompany}>
                        {
                            companyPost.map((data) => <Select.Option key={data.id} value={data.id}>{data.company}</Select.Option>)
                        }
                  </Select>
                    </Form.Item>
                    </Form.Item>
                <Form.Item  name="gender" label="Gender" wrapperCol={{span:12}}>
                      <Radio.Group onChange={onChangeGender} value={gender}>
                         <Radio value='male'>male</Radio>
                         <Radio value='female'>female</Radio>
                      </Radio.Group>
                </Form.Item>
                 <Form.Item  name="position" label="Position" wrapperCol={{span:3}}>
                   <Input type="text" placeholder="position" onChange={onChangePosition} value={position} />
                </Form.Item>
                <Form.Item  name="email" label="Email" wrapperCol={{span:6}}>
                   <Input type="text" placeholder="email" onChange={onChangeEmail} value={email} />
                </Form.Item>
                <Form.Item  name="work" label="Work" wrapperCol={{span:12}}>
                   <Input type="text" placeholder="workInfo" onChange={onChangeWork} value={work} />
                </Form.Item>
                <Form.Item  wrapperCol={{offset:3}}>
                <Button type="primary" htmlType="submit" style={{ marginRight: '8px' }} loading={addContactLoading} >
                    등록하기
                </Button>
                <Button type="primary" onClick={() => Router.back()}>
                    취소
                </Button>
                </Form.Item>
            </Form>
            </Container>
        </AppLayout>
    )
};

export const getServerSideProps = wrapper.getServerSideProps(async (context)=>{
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
    context.store.dispatch({
        type: LOAD_COMPANY_REQUEST,
      });
    context.store.dispatch(END); // 이게있어야 석세스까지 하고 들고옴
    await context.store.sagaTask.toPromise();// 이게있어야 석세스까지 하고 들고옴
  });

export default companyForm;