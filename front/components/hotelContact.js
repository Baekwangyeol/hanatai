import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Select, Input, Button, Modal } from 'antd';
import { HOTEL_CONTACT_REQUEST } from '../reducers/hotel';

function error(err) {
  Modal.error({
    content: err,
  });
}

const hotelContact = ({ hotel }) => {
  const dispatch = useDispatch();
  const { contactPost } = useSelector((state) => state.contact);
  const { addContactDone, addContactError } = useSelector((state) => state.contact);
  const [contact, setContact] = useState('select');

  useEffect(() => {
    if (addContactDone) {
      setContact('select');
    } else if (addContactError) {
      error(addContactError);
    }
  }, [addContactDone, addContactError]);

  const onChangeCompany = useCallback((value) => {
    setContact(value);
  }, [contact]);

  const onSubmitAccount = useCallback(() => {
    if (contact === 'select') {
      return alert('담당자를 선택해주세요');
    }
    console.log(contact, hotel.id);
    dispatch({
      type: HOTEL_CONTACT_REQUEST,
      data: { contact, hotelId: hotel.id },
    });
  }, [contact, hotel.id]);

  return (
    <>
      <Form layout="inline" onFinish={onSubmitAccount}>
        <Form.Item
          hasFeedback
          label="AddContactChannel"
          style={{ width: 300 }}
        >
                  <Select value={contact} onChange={onChangeCompany}>
                        {
                            contactPost.map((data) => <Select.Option key={data.id} value={data.id}>{data.contact}</Select.Option>)
                        }
                  </Select>
              </Form.Item>
           <Button type="primary" htmlType="submit" style={{ marginRight: '8px' }}  >
                    등록하기
            </Button>
        </Form>
        </>
    )
}

export default hotelContact;