import React, { useState,useCallback} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import DatePicker from "react-datepicker";
import { Button,Form,Row,Col,Input,Cascader,Modal,Checkbox } from 'antd';
import styled from 'styled-components';
import "react-datepicker/dist/react-datepicker.css";
import { ADD_HANACODE_REQUEST } from '../reducers/booking';



const FormInput = styled(Form)`
padding: 24px;
background: #fbfbfb;
border: 1px solid #d9d9d9;
border-radius: 2px;
`; 

function error(err) {
  Modal.error({
    content: err,
  });
}


const DateFilterData = [
  {
    id: 1,
    value: "전체",
  },
  {
    id: 2,
    value: "오늘",
  },
  {
    id: 3,
    value: "3일",
  },
  {
    id: 4,
    value: "1주일",
  },
  {
    id: 5,
    value: "1개월",
  },
  {
    id: 6,
    value: "3개월",
  },
];

const bookingSearchForm = ({
  Search,
  handleBtnClicked,
  btnClicked,
  startDate,
  setStartDate,
  endDate,
  checkSearch,
  searchCode,
  handleAllCheck,
  handleSingleCheck,
  onChangeSearch,
  setEndDate
  }) =>{

    return(
        <>
        <FilterSection>
          <ButtonCheckboxWraaper>
         <SimpleDateBtn>
          {DateFilterData.map((el, idx) => (
            <DateInput
              onClick={()=>handleBtnClicked(el.value)}
              key={idx}
              backgroundColor={btnClicked === el.value}
            >
              {el.value}
              </DateInput>
          ))}
        </SimpleDateBtn>
        <CheckboxWrapper>
        <CheckboxLabel><input type="checkbox"  value="all" onChange={(e) => handleAllCheck(e.target.checked)} checked={checkSearch.length === 2 ? true : false}/>전체</CheckboxLabel>
        <CheckboxLabel><input type="checkbox" value="check" onChange={(e) => handleSingleCheck(e.target.checked, e.target.value)} checked={checkSearch.includes('check') ? true : false}/>예약체크</CheckboxLabel>
        <CheckboxLabel><input type="checkbox" value="confirm" onChange={(e) => handleSingleCheck(e.target.checked, e.target.value)} checked={checkSearch.includes('confirm') ? true : false }/>확정</CheckboxLabel>
        </CheckboxWrapper>
        </ButtonCheckboxWraaper>
        <div>
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
      <SearchWrapper>
        <SearchLabel>codeSearch :</SearchLabel>
        <SearchInput placeholder="codeSearch" onChange={onChangeSearch} value={searchCode}/>
      </SearchWrapper>
      </div>
      <ButtonInput onClick={()=>Search(startDate, endDate,searchCode.trim(),checkSearch)}>검색</ButtonInput>
      </FilterSection>
        </>
    )
}

export default bookingSearchForm;

const FilterSection = styled.div`
  width:auto;
  display:flex;
  padding: 20px;
  @media (min-width:500px){
    display:block;
  }
  @media (min-width:740px){
    display:block;
  }

  @media (min-width:1400px){
    display:flex;
    width:60%;
   }
`

const SimpleDateBtn = styled.div`
  width: auto;
  margin-right: 15px;
  @media (min-width:500px){
    display:block;
  }
  @media (min-width:740px){
    display:flex;
    width:auto;
  }
  @media (min-width:1400px){
    display:flex;
    width:auto;
   }
  `;

const DateInput = styled.button`
  padding:5px 10px;
  font-size:12px;
  margin-right:8px;
  cursor:pointer;
  border-radius:10px;
  border:1px;
  height:40px;
  background-color: ${props => {
    if (props.backgroundColor) return '#249D3D';
    else return '#7B838B';
  }};
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

  @media (min-width:500px){
    margin-top:10px;
  }
  @media (min-width:740px){
    margin-top:5px;
  }
  @media (min-width:1400px){
    display:flex;
    margin-top:0px;
   }
`


const ButtonInput = styled.button`
  padding:5px 10px;
  font-size:12px;
  height:30px;
  width:100px;
  cursor:pointer;
  border-radius:10px;
  border:1px;
  @media (min-width:500px){
    display:block;
    margin-top:8px;
  }
  @media (min-width:740px){
    width:120px;
    margin-top:5px;
  }
  @media (min-width:1400px){
    width:120px;
    margin-top:0px;
    margin-left:5px;
   }
`

const SearchWrapper = styled.div`
   display:flex;
`

const SearchLabel = styled.div`
   margin-right:5px;
   margin-top:16px;
`

const SearchInput = styled.input`
   width:75%;
   margin-right:5px;
   margin-top:16px;
`

const ButtonCheckboxWraaper = styled.div`
   display:block;
`

const CheckboxLabel = styled.label`
   margin-right:10px;
   font-size:15px;
   cursor:pointer;
`
const CheckboxWrapper =styled.div`
   margin-top:16px;
   text-align:center;
  `