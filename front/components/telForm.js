import React, { useCallback, useState, useEffect } from 'react';
import { Form, Select, Input, Button, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_TEL_REQUEST } from '../reducers/contact';

function error(err) {
  Modal.error({
    content: err,
  });
}

const telForm = ({ contact }) => {
  const dispatch = useDispatch();
  const { countryPost } = useSelector((state) => state.addother);
  const { addTelDone, addTelError } = useSelector((state) => state.contact);
  const [tel, setTel] = useState('');
  const [country, setCountry] = useState('select');

  useEffect(() => {
    if (addTelDone) {
      setTel('');
      setCountry('select');
    } else if (addTelError) {
      error(addTelError);
    };
  }, [addTelDone, addTelError]);

  const onChangeTel = useCallback((e) => {
    setTel(e.target.value);
  }, [tel]);

  const onChangeCountry = useCallback((value) => {
    setCountry(value);
  }, [country]);

  const onSubmitTel = useCallback(() => {
    console.log(country, tel);
    dispatch({
      type: ADD_TEL_REQUEST,
      data: { country, tel, contactId: contact.id },
    });
  }, [tel, country]);

  return (
    <>
      <Form layout="inline" onFinish={onSubmitTel}>
        <Form.Item
          hasFeedback
          label="AddTelnumber"
          style={{ width: 180 }}
        >
          <Select value={country} onChange={onChangeCountry}>
            {
              countryPost.map((data) => <Select.Option key={data.id} value={data.id}>{data.country}</Select.Option>)
            }
                  </Select>
                    </Form.Item>
                    <Form.Item
                    >
                    <Input type="text" placeholder="TelNumber" onChange={onChangeTel} value={tel} />
                    </Form.Item>
           <Button type="primary" htmlType="submit" style={{ marginRight: '8px' }}  >
                    등록하기
            </Button>
        </Form>
        </>
    )

};

export default telForm;