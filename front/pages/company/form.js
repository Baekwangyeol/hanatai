import React,{ useState,useCallback,useEffect } from 'react';
import Router from 'next/router';
import { END } from 'redux-saga';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Select, Button, Modal } from 'antd';
import axios from 'axios';
import styled from 'styled-components';
import AppLayout from '../../components/AppLayout';
import wrapper from '../../store/configureStore';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import { LOAD_REGION_REQUEST, LOAD_COUNTRY_REQUEST } from '../../reducers/addother';
import { ADD_COMPANY_REQUEST } from '../../reducers/company';

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
    onOk() { Router.replace('/company'); },
  });
}

function error(err) {
  Modal.error({
    content: err,
  });
}

const companyForm = () => {
  const { regionPost, countryPost } = useSelector((state) => state.addother);
  const { addCompanyLoading, addCompanyDone, addCompanyError } = useSelector((state) => state.company);

  useEffect(() => {
    if (addCompanyDone) {
      success();
    } else if (addCompanyError) {
      error(addCompanyError);
    }
  }, [addCompanyDone, addCompanyError]);
    
    
  const dispatch = useDispatch();
    const [company, setCompany] = useState('');
    const [address, setAddress] = useState('');
    const [country, setCountry] = useState('');
    const [region, setRegion] = useState('');
    const [business, setBusiness] = useState('');
    
    const onChangeCompany = useCallback((e) => {
        setCompany(e.target.value);
        },[company]);
    
    const onChangeAddress = useCallback((e) => {
        setAddress(e.target.value);
            },[address]);

    const onChangeCountry = useCallback((value) => {
        setCountry(value);
            }, [country]);
        
    const onChangeRegion = useCallback((value) => {
        setRegion(value);
            },[region]);

    const onChangeBusiness = useCallback((e) => {
        setBusiness(e.target.value);
        },[business]);

    const onChangeSubmit = useCallback(()=>{
        console.log(company, address, business, region,country);
        dispatch({
            type: ADD_COMPANY_REQUEST,
            data: { company, address, business, region, country },
        })
      
    },[company, address, region, business, country]);
    
    return(
        <AppLayout>
            <Container>
                <Title>
                    회사 등록
                    <hr/>
                </Title>
            <Form 
            {...formItemLayout}
            onFinish={onChangeSubmit}>
                <Form.Item  name="company" label="Company">
                   <Input type="text" placeholder="CompanyName" onChange={onChangeCompany} value={company} />
                </Form.Item>
                 <Form.Item  name="address" label="Address" wrapperCol={{span:12}}>
                   <Input type="text" placeholder="address" onChange={onChangeAddress} value={address} />
                </Form.Item>
                <Form.Item  label="Country" wrapperCol={{span:12}}>
                  <Form.Item
                    name="country"
                    hasFeedback
                    style={{ display: 'inline-block', width: 'calc(50%)', marginRight: '5px', marginBottom: '0px' }}>
                    <Select placeholder="Please select a country" onChange={onChangeCountry}>
                        {
                            countryPost.map((data) => <Select.Option key={data.id} value={data.id}>{data.country}</Select.Option>)
                        }
                  </Select>
                    </Form.Item>
                    </Form.Item>
                <Form.Item  label="Region" wrapperCol={{span:12}}>
                  <Form.Item
                    name="region"
                    hasFeedback
                    style={{ display: 'inline-block', width: 'calc(50%)', marginRight:'5px', marginBottom:'0px'  }}>
                    <Select placeholder="Please select a region" onChange={onChangeRegion} >
                        {
                            regionPost.map((data) => <Select.Option key={data.id} value={data.id}>{data.region}</Select.Option>)
                        }
                  </Select>
                    </Form.Item>
                 </Form.Item>
                 <Form.Item  name="business" label="Business" wrapperCol={{span:12}}>
                   <Input type="text" placeholder="Business" onChange={onChangeBusiness} value={business} />
                </Form.Item>
                <Form.Item  wrapperCol={{offset:3}}>
                <Button type="primary" htmlType="submit" style={{ marginRight: '8px' }}  loading={addCompanyLoading}>
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
        type: LOAD_COUNTRY_REQUEST,
      });
    context.store.dispatch({
        type: LOAD_REGION_REQUEST,
      });
    context.store.dispatch(END); // 이게있어야 석세스까지 하고 들고옴
    await context.store.sagaTask.toPromise();// 이게있어야 석세스까지 하고 들고옴
  });

export default companyForm;