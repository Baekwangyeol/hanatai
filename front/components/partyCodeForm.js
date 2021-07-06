import React,{ useCallback,useState } from 'react';
import { Modal,Button,Form,Checkbox } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_PARTY_CODE_REQUEST } from '../reducers/party';
import styled from 'styled-components';
import Modalmade from './Modal/Modal';

const StatusCursor = styled.span`
    cursor: pointer;
    margin-right:5px;
`;


const partyCodeForm = ({ party }) => {
    const dispatch = useDispatch();
    const { confirmPost } = useSelector((state) => state.booking);
    const [OpenModal, setOpenModal] = useState(false);
    const [code, setCode] = useState([]);

  const showModal = () => {
    setOpenModal((prev) => !prev);
  };

  const closeModal = () => {
    setOpenModal((prev) => !prev);
  };

  const confirmModal = (data) =>{
    dispatch({
      type: ADD_PARTY_CODE_REQUEST,
      data: { code , partyId: party.id },
    })
    setOpenModal((prev) => !prev);
  }

  const codeLength = confirmPost.filter((hana)=> hana.firstday === party.startdate);

  const onChangeCode = useCallback((e)=>{
      console.log(e.target.checked);
      console.log(e.target.value);
    if(e.target.checked){
      setCode([...code, e.target.value]);
    }else{
      //체크해제
      setCode(code.filter((v)=> v !== e.target.value));
    }
  },[code]);

  const onSubmitForm = useCallback(() => {
    console.log(code,party.id);
      dispatch({
       type: ADD_PARTY_CODE_REQUEST,
       data: { code , partyId: party.id },
     })
  }, [code]);


    return (
        <>
        <StatusCursor onClick={showModal}>
         코드 <ConfirmOne>{codeLength.length}</ConfirmOne>
        </StatusCursor>
        |
        <Modalmade open={OpenModal} close={closeModal} ok={confirmModal} header='확정 코드 추가하기'>
        {codeLength.map((hana)=>
              <>
              <Checkbox checked={code.includes(hana.id) ? true : false} onChange={onChangeCode} value={hana.id} key={hana.id}>{hana.code}</Checkbox>{hana.status}<br/>
              </>
        )}
        </Modalmade>
 
        {/* <Modal
        title="확정CODE"
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
            {confirmPost.map((hana)=> 
                <>
                <Checkbox checked={code.includes(hana.id) ? true : false} onChange={onChangeCode} value={hana.id} key={hana.id}>{hana.code}</Checkbox>{hana.status}<br/>
                </>
            )}
        </Form>
      </Modal> */}
        </>
    )

}

export default partyCodeForm;

const ConfirmOne = styled.span`
  border-radius:50%;
  border:1px solid #fff;
  background-color:#E957A7;
  padding:3px;
`