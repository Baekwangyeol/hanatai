import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import Router from 'next/router';
import { Form, Input, Button, Checkbox, Row, Col, Modal } from 'antd';
import styled from 'styled-components';
import { LOG_IN_REQUEST } from '../reducers/user';

const LoginWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 8px;
`;

const LoginTitle = styled.div`
  left: 50%;
  position: absolute;
  width: 600px;
  margin-left: -300px;
  border: 1px solid #000;
  padding: 10px;
`;

const Login = () => {
  const dispatch = useDispatch();
  const { me, loginLoading, loginError } = useSelector((state) => state.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function error(err) {
    Modal.error({
      content: err,
    });
  }

  useEffect(() => {
    if (me && me.id) {
      Router.replace('/');
    }
  }, [me && me.id]);

  useEffect(() => {
    if (loginError) {
      error(loginError);
    }
  }, [loginError]);

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 8,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 8,
    },
  };
  const onChangeEmail = useCallback((e) => {
    setEmail(e.currentTarget.value);
  }, []);

  const onChangePassword = useCallback((e) => {
    setPassword(e.currentTarget.value);
  }, []);

  const onSubmitForm = useCallback(() => {
    dispatch({
      type: LOG_IN_REQUEST,
      data: { email, password },
    });
  }, [email, password]);

  return (
    <LoginWrapper>
      <LoginTitle>
        <Row gutter={8} style={{ marginBottom: '15px' }}>
          <Col offset={8} span={8}>
            하나타이 로그인하기
          </Col>
        </Row>
        <Form {...layout} name="basic" onFinish={onSubmitForm}>
          <Form.Item
            label="UserEmail"
            name="email"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input value={email} onChange={onChangeEmail} />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password value={password} onChange={onChangePassword} />
          </Form.Item>
          <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: '8px' }}
              loading={loginLoading}
            >
              로그인
            </Button>
            <Button type="primary">
              <Link href="/signup">회원가입</Link>
            </Button>
          </Form.Item>
        </Form>
      </LoginTitle>
    </LoginWrapper>
  );
};

export default Login;
