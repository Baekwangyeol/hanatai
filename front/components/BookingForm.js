import React, { useState,useCallback} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { Button,Form,Row,Col,Input,Cascader,Modal } from 'antd';
import DatePicker from "react-datepicker";
import styled from 'styled-components';
import { ADD_HANACODE_REQUEST } from '../reducers/booking';
import dayjs from 'dayjs';



function error(err) {
  Modal.error({
    content: err,
  });
}

const BookingForm = () => {
  const dispatch = useDispatch();
  const [hanacode,setHanaode] = useState('');
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();



  const onChangeHanacode = useCallback((e) => {
    setHanaode(e.target.value);
  }, [hanacode]);

  const onSubmitForm = useCallback(() => {
    if(hanacode.charAt(0) !== 'a'){
      return error('코드가 이상합니다.')
    }
    if(startDate > endDate){
      return error('날짜를 제대로 입력해주세요.');
    }
    console.log(hanacode,startDate, endDate)
    console.log(dayjs(startDate).format());
    dispatch({
      type:ADD_HANACODE_REQUEST,
      data:{hanacode,startDate,endDate }
    })
  }, [hanacode,startDate,endDate]);

  return (
    <>
      <BookingFormFilter>
        <BookingInput  type="text" name="hanacode" value={hanacode} onChange={onChangeHanacode} placeholder="Hanacode" />
        <FilterSection>
        <DateFilter>
        <SelectDate
          selected={startDate}
          dateFormat="yyyy-MM-dd"
          onChange={(date) => setStartDate(date)}
          placeholderText="클릭해주세요."
        />
        <BetweenDate> ~ </BetweenDate>
        <SelectDate
          selected={endDate}
          dateFormat="yyyy-MM-dd"
          onChange={(date) => setEndDate(date)}
          placeholderText="클릭해주세요."
        />
      </DateFilter>
      </FilterSection>
      <ButtonInput onClick={onSubmitForm}>등록</ButtonInput>
      </BookingFormFilter>
    </>
  );
};

export default BookingForm;


const BookingFormFilter = styled.div`
  background-color:palevioletred;
  display:flex;
  @media (min-width:500px){
    display:block;
  }
  @media (min-width:740px){
    display:block;
  }
  @media (min-width:1400px){
    display:flex;
    width:50%;
   }
`

const BookingInput = styled.input`
font-size: 18px;
padding: 5px;
margin: 20px;
height: 30px;
background: papayawhip;
border: none;
border-radius: 3px;
::placeholder {
  color: palevioletred;
}
@media (min-width:500px){
  padding: 0 20px;
}
@media (min-width:740px){
  margin-top:8px;
  margin-bottom:8px;
}
@media (min-width:1400px){
  margin-top:20px;
 }
`

const FilterSection = styled.div`
  width:auto;
  display:flex;
  padding: 20px;
  @media (min-width:500px){
    padding: 0 20px;
  }
  @media (min-width:740px){
    margin-top:8px;
    margin-bottom:12px;
  }
  @media (min-width:1400px){
    margin-top:20px;
    margin-left:-20px;
   }
  
`

const SelectDate = styled(DatePicker)`
  height: 30px;
  padding: 6px 12px;
  font-size: 14px;
  text-align: center;
  border: 1px solid #e5e5e5;
  outline: none;
  cursor: pointer;
 
`;

const BetweenDate = styled.span`
  display: table;
  padding: 5px 12px;
  background-color: #e5e5e5;
  border: 1px solid #e5e5e5;
  font-size: 12px;
  cursor: pointer;
`;

const DateFilter = styled.div`
  display:flex;
`

const ButtonInput = styled.button`
  padding:5px 10px;
  font-size:12px;
  height:30px;
  width:100px;
  margin-top:20px;
  margin-right:8px;
  cursor:pointer;
  border-radius:10px;
  border:1px;
  margin-left:20px;
  @media (min-width:500px){
    display:block;
    margin-top:12px;
  }
  @media (min-width:740px){
    display:block;
    margin-top:-5px;
    margin-bottom:5px;
  }
  @media (min-width:1400px){
    margin-left:0px;
    margin-top:20px;
   }
`