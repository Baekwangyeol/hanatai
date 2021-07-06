import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Select, Input, Button, Modal } from 'antd';
import { ADD_ACCOUNT_REQUEST } from '../reducers/contact';

function error(err) {
  Modal.error({
    content: err,
  });
}

const messengerForm = ({ contact }) => {
  const dispatch = useDispatch();
  const { messengerPost } = useSelector((state) => state.addother);
  const { addAccountDone, addAccountError } = useSelector((state)=> state.contact);
  const [account, setAccount] = useState('');
  const [messenger, setMessenger] = useState('select');

  useEffect(() => {
    if (addAccountDone) {
      setAccount('');
      setMessenger('select');
    } else if (addAccountError) {
      error(addAccountError);
    }
  }, [addAccountDone, addAccountError]);

  const onChangeAccount = useCallback((e) => {
    setAccount(e.target.value);
  }, [account]);

  const onChangeMessenger = useCallback((value) => {
    setMessenger(value);
  }, [messenger]);

  const onSubmitAccount = useCallback(() => {
    console.log(messenger,account,contact.id);
    dispatch({
      type: ADD_ACCOUNT_REQUEST,
      data: { messenger, account, contactId: contact.id },
    });
  }, [account, messenger]);

  return (
    <>
      <Form layout="inline" onFinish={onSubmitAccount}>
        <Form.Item
          hasFeedback
          label="AddMessenger"
          style={{ width: 200 }}
        >
          <Select value={messenger} onChange={onChangeMessenger}>
                        {
                            messengerPost.map((data) => <Select.Option key={data.id} value={data.id}>{data.messenger}</Select.Option>)
                        }
                  </Select>
                    </Form.Item>
                    <Form.Item
                    >
                    <Input type="text" placeholder="messengerId" value={account} onChange={onChangeAccount}  />
                    </Form.Item>
           <Button type="primary" htmlType="submit" style={{ marginRight: '8px' }}  >
                    등록하기
            </Button>
        </Form>
        </>
    )
}

export default messengerForm;