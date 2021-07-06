import React,{ useState, useCallback, useEffect } from 'react';
import { Button, Form, Row, Col, Input, Select, Modal } from 'antd';
import styled from 'styled-components';
import { useSelector,useDispatch} from 'react-redux';
import { ADD_PEOPLE_REQUEST } from '../reducers/booking';


function error(err) {
    Modal.error({
      content: err,
    });
  }
  

const peopleForm = ({ reserve }) =>{
    const dispatch = useDispatch();
    const { addPeopleDone,addPeopleError } =useSelector((state) => state.booking);
    const [representative, setRepresentative] = useState('');
    const [form] = Form.useForm();
    const [adult, setAdult] = useState('');
    const [child, setChild] = useState('');
    const [infant, setInfant] = useState('');

    useEffect(() => {
      if (addPeopleDone) {
        setAdult('');
        setChild('');
        setInfant('');
        setRepresentative('');
      }
    }, [addPeopleDone]);

    const onChangeRepresentative = useCallback((e) => {
        setRepresentative(e.target.value);
    }, [representative]);

    const onChangeAdult = useCallback((e) => {
        setAdult(e.target.value);
    }, [adult]);

    const onChangeChild = useCallback((e) => {
        setChild(e.target.value);
    }, [child]);
    
    const onChangeInfant = useCallback((e) => {
        setInfant(e.target.value);
    }, [infant]);

    const onSubmitForm = useCallback(() => {
      if((adult) === ''){
        return error('인원 입력해주세요');
      }
     
      dispatch({
        type: ADD_PEOPLE_REQUEST,
        data: { representative, adult, child, infant, bookingId: reserve.id },
    });
    }, [representative, adult, child, infant]);
  
    return(
        <>
          <PeopleContainer>
            <PeopleTitleForm>인원 추가</PeopleTitleForm>
            <hr/>
            <InputWrapper>
               <PeopleInputLabel>대표자 : </PeopleInputLabel>
               <PeopleInput placeholder='representative' onChange={onChangeRepresentative} value={representative}/>
            </InputWrapper>
            <InputWrapper>
            <PeopleInputLabel> {'\u00A0'}{'\u00A0'} 성 인 : </PeopleInputLabel>
            <PeopleInput placeholder='adult' onChange={onChangeAdult} value={adult}/>
            </InputWrapper>
            <InputWrapper>
            <PeopleInputLabel> {'\u00A0'}{'\u00A0'} 아 동  : </PeopleInputLabel>
            <PeopleInput placeholder='child' onChange={onChangeChild} value={child}/>
            </InputWrapper>
            <InputWrapper>
            <PeopleInputLabel> {'\u00A0'}{'\u00A0'} 유 아  : </PeopleInputLabel>
            <PeopleInput placeholder='infant' onChange={onChangeInfant} value={infant}/>
            </InputWrapper>
            <InputWrapper>
              <PeopleButton onClick={onSubmitForm}>등록</PeopleButton>
            </InputWrapper>
          </PeopleContainer>
        </>
    )
}

export default peopleForm;


const PeopleContainer = styled.div`
    padding:10px;
`
const PeopleTitleForm = styled.div`
    margin-left:16px;
    font-size:16px;
    display:block;
    margin-bottom:8px;
`

const PeopleInput = styled.input`

`

const PeopleInputLabel = styled.div`
  display:inline-block;
  font-size:16px;
  margin-right:5px;
`

const InputWrapper = styled.div`
  display:block;
  margin-bottom:16px;
  margin-top:10px;
  text-align:center;
`

const PeopleButton = styled.button`
  background-color:#69CA82;
  border:1px;
  border-radius:10px;
  margin-left:24px;
  width:200px;
  height:30px;
  cursor:pointer;
`