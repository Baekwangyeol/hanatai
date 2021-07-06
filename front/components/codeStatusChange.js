import React,{ useCallback,useState } from 'react';
import { Modal,Button,Form,Select } from 'antd';
import { useDispatch } from 'react-redux';
import { UPDATE_CODESTATUS_REQUEST } from '../reducers/booking';
import styled from 'styled-components';

const StatusCursor = styled.span`
    cursor: pointer;
`;

const codeStatusChange = ({ code }) => {
    const dispatch = useDispatch();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [status, setStatus] = useState('');
 
  const showModal = () => {
    setIsModalVisible((prev) => !prev);
  };

  const handleOK = () => {
    setIsModalVisible((prev) => !prev);
  };

  const handleCancel = () => {
    setIsModalVisible((prev) => !prev);
  };
  const onChangeStatus = useCallback((e)=>{
    console.log(status);
    setStatus(e);
  },[status]);

  const onSubmitForm = useCallback(() => {
      dispatch({
        type: UPDATE_CODESTATUS_REQUEST,
        data: { status, hanacodeId: code.id },
      })
  }, [status]);


    return (
        <>
        <StatusCursor onClick={showModal}>
          {code.status}
        </StatusCursor>
        <Modal
        title="예약상태"
        visible={isModalVisible}
        onCancel={handleCancel}
        destroyOnClose={true}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button type="primary" form="myForm" key="submit" htmlType="submit" onClick={handleOK}>
            Submit
          </Button>
        ]}
      ><Form
      id="myForm"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      onFinish={onSubmitForm}
      >
          <Form.Item  label="Status" wrapperCol={{ span: 8 }} >
         <Select value={status} onChange={onChangeStatus}>
                   <Select.Option value='예약체크'>예약체크</Select.Option>
                   <Select.Option value='예약완료'>예약완료</Select.Option>
                   <Select.Option value='확정'>확정</Select.Option>
          </Select>
          </Form.Item>
        </Form>
      </Modal>
        </>
    )

}

export default codeStatusChange;