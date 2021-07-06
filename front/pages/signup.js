import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import {
  Form,
  Input,
  Checkbox,
  Button,
  Row,
  Col,
  Modal,
  Select,
} from 'antd';
import styled from 'styled-components';
import { SIGN_UP_REQUEST } from '../reducers/user';

const RegisterWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 8px;
    `;

const RegisterTitle = styled.div`
 left:50%;  
 position: absolute; 
 width:600px;
 margin-left:-300px;
 border:1px solid #000;
 padding:10px;
`;

const Signup = () => {
  const dispatch = useDispatch();
  const { signUpLoading, signUpDone, signUpError } = useSelector((state) => state.user);

  function success() {
    Modal.success({
      content: '회원가입 성공',
      onOk() { Router.replace('/'); },
    });
  }

  function error() {
    Modal.error({
      content: signUpError,
    });
  }

  useEffect(() => {
    if (signUpDone) {
      success();
    }
  }, [signUpDone]);

  useEffect(() => {
    if (signUpError) {
      error();
    }
  }, [signUpError]);

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

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [position, setPosition] = useState('');

  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, [email]);

  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, [password]);

  const onChangeConfirmPassword = useCallback((e) => {
    setConfirmPassword(e.target.value);
    setPasswordError(e.target.value !== password);
  }, [password]);

  const onChangeName = useCallback((e) => {
    setName(e.target.value);
  }, [name]);

  const onChangeNickName = useCallback((e) => {
    setNickname(e.target.value);
  }, [nickname]);

  const onChangePosition = useCallback((value) => {
    setPosition(value);
  }, [position]);

  const [term, setTerm] = useState(false);
  const [termError, setTermError] = useState(false);
  const onChangeTerm = useCallback((e) => {
    setTermError(false);
    setTerm(e.target.checked);
  }, []);

  const onSubmit = useCallback(() => {
    if (password !== confirmPassword) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    console.log(email, password, name, nickname, position);

    dispatch({
      type: SIGN_UP_REQUEST,
      data: { email, password, name, nickname, position },
    });
}, [email, password, confirmPassword, term,nickname, position]);

  return (
    <RegisterWrapper>
      <RegisterTitle>
        <Row gutter={8} style={{ marginBottom: '15px' }}>
          <Col offset={8} span={8}>
            하나타이 신규가입
          </Col>
        </Row>
  <Form
    {...layout}
    name="register"
    onFinish={onSubmit}
  >
    <Form.Item
      name="email"
      label="E-mail"
    >
      <Input value={email} onChange={onChangeEmail} />
    </Form.Item>

    <Form.Item
      name="password"
      label="Password"
    >
      <Input.Password value={password} onChange={onChangePassword}/>
    </Form.Item>

    <Form.Item
      name="confirm"
      label="Confirm Password"
    >
      <Input.Password value={confirmPassword} onChange={onChangeConfirmPassword} />
      {passwordError && <div style={{ color: 'red' }}>비밀번호가 일치하지않습니다.</div>}
    </Form.Item>

    <Form.Item
      name="name"
      label={
        <span>
          name&nbsp;
        </span>
      }
    >
      <Input value={name} onChange={onChangeName} />
    </Form.Item>

    <Form.Item
      name="nickname"
      label={
        <span>
          Nickname&nbsp;
        </span>
      }
    >
      <Input value={nickname} onChange={onChangeNickName} />
    </Form.Item>

    <Form.Item
      name="position"
      label={
        <span>
          Position&nbsp;
        </span>
      }
    >
        <Select placeholder="Please select a country" onChange={onChangePosition}>
              <Select.Option value='guide'>가이드</Select.Option>
              <Select.Option value='office'>사무실</Select.Option>
        </Select>
    </Form.Item>

    <Form.Item
      {...tailLayout}
      name="agreement"
      valuePropName="checked"
    >
      <Checkbox checked={term} onChange={onChangeTerm}>
        I have read the <a href="">agreement</a>
      </Checkbox>
      {termError && <div style={{ color: 'red' }}>약관에 동의하셔야 합니다.</div>}
    </Form.Item>
    <Form.Item {...tailLayout}>
      <Button type="primary" htmlType="submit" loading={signUpLoading}>
        회원가입
      </Button>
    </Form.Item>
  </Form>
  </RegisterTitle>
  </RegisterWrapper>

  );
};

export default Signup;