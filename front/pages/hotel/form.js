import React,{ useState,useCallback,useEffect, useRef } from 'react';
import Router from 'next/router';
import { END } from 'redux-saga';
import { useDispatch, useSelector } from 'react-redux';
import { Form,Input,Select,Rate,Button,Modal } from 'antd';
import axios from 'axios';
import HotelForm from '../../components/hotelForm'
import AppLayout from '../../components/AppLayout';
import wrapper from '../../store/configureStore';
import styled from 'styled-components';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import { LOAD_REGION_REQUEST, LOAD_COUNTRY_REQUEST } from '../../reducers/addother';
import { ADD_HOTEL_REQUEST, UPLOAD_MAINIMAGE_REQUEST, REMOVE_MAINIMAGE } from '../../reducers/hotel';

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

function success(data) {
  Modal.success({
    content: data,
    onOk() { Router.replace('/hotel'); },
  });
}

function error(error) {
  Modal.error({
    content: error,
  });
}

const hotelForm = () => {
  const { regionPost, countryPost } = useSelector((state) => state.addother);
  const { addHotelLoading, addHotelDone, addHotelError, mainImage } = useSelector((state) => state.hotel);

  useEffect(() => {
    if (addHotelDone) {
      success(addHotelDone);
    } else if (addHotelError) {
      error(addHotelError);
    }
  }, [addHotelDone, addHotelError]);

  const dispatch = useDispatch();
  const [hotel, setHotel] = useState('');
  const [initials, setInitials] = useState('');
  const [region, setRegion] = useState('');
  const [country, setCountry] = useState('');
  const [star, setStar] = useState(0);
  const imageInput = useRef();

  const onChangeHotel = useCallback((e) => {
    setHotel(e.target.value);
  }, [hotel]);

  const onChangeInitials = useCallback((e) => {
    setInitials(e.target.value);
  }, [initials]);

  const onChangeRegion = useCallback((value) => {
    setRegion(value);
  }, [region]);

  const onChangeCountry = useCallback((value) => {
    setCountry(value);
  }, [country]);

  const onChangeStar = useCallback((value) => {
    setStar(value);
  }, [star]);

  const onClickImageUpload = useCallback(()=>{
    imageInput.current.click();
  }, [imageInput.current]);

  const onChangeImages = useCallback((e) => {
    console.log('image', e.target.files[0]);
    const imageFormData = new FormData(); //Formdata로 보내야 multipart로감
    imageFormData.append('image', e.target.files[0]);
    dispatch({
      type: UPLOAD_MAINIMAGE_REQUEST,
      data: imageFormData,
    });
  });

  const onRemoveImage = useCallback(()=> () =>{
    dispatch({
      type: REMOVE_MAINIMAGE,
    });
  });

  const onChangeSubmit = useCallback(() => {
    if (!hotel || !initials || !star) {
      return error('게시글을 작성해주세요');
    }
    const formData = new FormData();
    formData.append('image', mainImage);
    formData.append('hotel', hotel);
    formData.append('initials', initials);
    formData.append('region', region);
    formData.append('country', country);
    formData.append('star', star);
    return dispatch({
      type: ADD_HOTEL_REQUEST,
      data: formData,
    });
  }, [hotel, initials, region, country, star, mainImage]);

  return (
    <AppLayout>
      <Container>
        <Title>
          호텔 등록
        <hr/>
        </Title>
        <Form
          {...formItemLayout}
          encType="multipart/form-data"
          onFinish={onChangeSubmit}
        >
          <Form.Item name="hotel" label="Hotel">
            <Input type="text" placeholder="hotelName" onChange={onChangeHotel} value={hotel} />
          </Form.Item>
          <Form.Item name="initials" label="Initials" wrapperCol={{span:4}}>
            <Input type="text" placeholder="initials" onChange={onChangeInitials} value={initials} />
          </Form.Item>
          <Form.Item name="star" label="star" wrapperCol={{span:5}}>
            <Rate onChange={onChangeStar} value={star} />
          </Form.Item>
          <Form.Item label="Country" wrapperCol={{span:12}}>
            <Form.Item
              name="country"
              hasFeedback
              style={{ display: 'inline-block', width: 'calc(50%)', marginRight: '5px', marginBottom: '0px' }}>
              <Select placeholder="Please select a country" onChange={onChangeCountry}>
                {  countryPost.map((data) => <Select.Option key={data.id} value={data.id}>{data.country}</Select.Option>) }
              </Select>
            </Form.Item>
          </Form.Item>
          <Form.Item label="Region" wrapperCol={{ span: 12 }}>
            <Form.Item
              name="region"
              hasFeedback
              style={{ display: 'inline-block', width: 'calc(50%)', marginRight: '5px', marginBottom: '0px' }}>
              <Select placeholder="Please select a region" onChange={onChangeRegion} >
                { regionPost.map((data) => <Select.Option key={data.id} value={data.id}>{data.region}</Select.Option>)}
              </Select>
            </Form.Item>
          </Form.Item>
          <div>
            <input type="file" name="image" multiple hidden ref={imageInput} onChange={onChangeImages}/>
            <Button onClick={onClickImageUpload}>이미지 업로드</Button>
          </div>
          <div>
            { mainImage && (
              <div style={{ display: 'inline-block' }}>
                <img src={`http://localhost:3065/${mainImage}`} style={{ width: '200px' }} alt={mainImage} />
                <div>
                  <Button onClick={onRemoveImage()}>제거</Button>
                </div>
              </div>
            )}
          </div>
          <Form.Item  wrapperCol={{offset:3}}>
            <Button type="primary" htmlType="submit" style={{ marginRight: '8px' }}  loading={addHotelLoading}>
              등록하기
            </Button>
            <Button type="primary" onClick={() => Router.back()}>
              취소
            </Button>
          </Form.Item>
        </Form>
      </Container>
    </AppLayout>
  );
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
    type: LOAD_REGION_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_COUNTRY_REQUEST,
  });
  context.store.dispatch(END); // 이게있어야 석세스까지 하고 들고옴
  await context.store.sagaTask.toPromise();// 이게있어야 석세스까지 하고 들고옴
});

export default hotelForm;