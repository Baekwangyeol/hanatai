import React,{useState,useCallback} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from 'styled-components';
import { ArrowDownOutlined } from '@ant-design/icons';


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

const partySearchForm = ({
  toggleFormOpen,
  onChangeSearch,
  searchCode,
  handleBtnClicked,
  btnClicked,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  Search
}) =>{

    return(
        <>
          <FilterSection>
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
      <SearchInput type="text" placeholder="Search" onChange={onChangeSearch} value={searchCode}/>
      <ButtonInput onClick={()=>Search(startDate, endDate,searchCode.trim())}>검색</ButtonInput>
      <FormOpen onClick={() =>toggleFormOpen()}><ArrowDownOutlined/>Form 열기</FormOpen>
    </FilterSection>
    <hr/>
        </>
    )
}

export default partySearchForm;

const FilterSection = styled.div`
  width:auto;
  display:flex;
  padding: 20px;
  position: relative;
`

const SimpleDateBtn = styled.div`
  width: auto;
  margin-right: 15px;
  `;

const DateInput = styled.button`
  padding:5px 10px;
  font-size:12px;
  margin-right:8px;
  cursor:pointer;
  border-radius:10px;
  border:1px;
  height:30px;
  background-color: ${props => {
    if (props.backgroundColor) return '#249D3D';
    else return '#7B838B';
  }};
`

const DateFilter = styled.div`
  display:flex;

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


const ButtonInput = styled.button`
  padding:5px 10px;
  font-size:12px;
  height:30px;
  width:100px;
  cursor:pointer;
  border-radius:10px;
  border:1px;
  margin-left:8px;
`
const BetweenDate = styled.span`
  display: table;
  padding: 5px 12px;
  background-color: #e5e5e5;
  border: 1px solid #e5e5e5;
  font-size: 12px;
  cursor: pointer;
`;

const FormOpen = styled.div`
position: absolute;
  right:0;
  bottom:0;
  cursor:pointer;
`

const SearchInput = styled.input`
    margin-left:8px;
    border-radius:10px;
    border:1px solid;
    width:200px;
`