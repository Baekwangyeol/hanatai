import React,{ useState, useCallback } from 'react';
import { Button, Form, Row, Col, Input, Select, Modal } from 'antd';
import styled from 'styled-components';
import DatePicker from "react-datepicker";
import { useSelector,useDispatch} from 'react-redux';
import { ADD_RESERVEROOM_REQUEST } from '../reducers/booking';
import { LOAD_HOTEL_REQUEST } from '../reducers/hotel';
import dayjs from 'dayjs';

function error(err) {
    Modal.error({
      content: err,
    });
  }
  

const peopleRoomtypeForm = ({ people }) =>{
  dayjs.locale('ko');
    const dispatch = useDispatch();
    const { hotelPost, singleHotel } = useSelector((state) => state.hotel);
    const [hotel, setHotel] = useState('');
    const [roomtype, setRoomtype] = useState('');
    const [numberOfRoom, setNumberOfRoom] = useState(0);
    const [extrabed, setExtrabed] = useState(0);
    const [extraPerson, setExtraPerson] = useState(0);
    const [FormOpend, setFormOpend] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
  

    const onChangeHotel = useCallback((value) => {
        setHotel(value);
        console.log(value);
        setFormOpend((prev) => !prev);
        dispatch({
            type: LOAD_HOTEL_REQUEST,
            data: value ,
          });
    }, [hotel]);

    const onChangeRoomtype = useCallback((value) => {
        setRoomtype(value);
    }, [roomtype]);

    const onChangeNumberOfRoom = useCallback((e) => {
        setNumberOfRoom(e.target.value);
    }, [numberOfRoom]);

    const onChangeExtrabed = useCallback((e) => {
        setExtrabed(e.target.value);
    }, [extrabed]);
    
    const onChangeExtraPerson = useCallback((e) => {
        setExtraPerson(e.target.value);
    }, [extraPerson]);


    const onSubmitForm = useCallback(() => {
      if(startDate === ''){
        return error('체크인 입력해주세요');
      }
      if(endDate === ''){
        return error('체크아웃 입력해주세요');
      }
      if(endDate < startDate){
        return error('체크인 체크아웃날짜를 확인해주세요');
      }
      if(new Date > startDate){
        return error('지난 날짜입니다.');
      }
      if(numberOfRoom === 0){
        return error('방갯수는 최소 1개 이상이어야합니다.');
      }
  
      const date1 = dayjs(startDate);
      const date2 = dayjs(endDate);
      const night = date2.diff(date1,'day');
      console.log(roomtype,numberOfRoom,extrabed,extraPerson,startDate, endDate, people.id,night);
      dispatch({
        type: ADD_RESERVEROOM_REQUEST,
        data: { numberOfRoom,extrabed,extraPerson,startDate, endDate, peopleId: people.id,roomtype,night },
    });
    }, [roomtype,numberOfRoom,extrabed,extraPerson,startDate, endDate]);
  

    return(
        <>
    <PeopleContainer>
            <PeopleTitleForm>호텔 추가</PeopleTitleForm>
            <hr/>
            <InputWrapper>
               <PeopleInputLabel>{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}Hotel : </PeopleInputLabel>
               <Select 
                        showSearch
                        placeholder="Search to Select"  
                        onChange={onChangeHotel}
                        optionFilterProp="hotel"
                        filterOption={(input, option) =>
                          option.hotel.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        filterSort={(optionA, optionB) =>
                          optionA.hotel.toLowerCase().localeCompare(optionB.hotel.toLowerCase())
                        }
                    >
                        {
                            hotelPost.map((data) => <Select.Option key={data.id} value={data.id}>{data.name}</Select.Option>)
                        }
                  </Select>
                  { FormOpend && singleHotel && (  
                  <Select placeholder="Please select a country" onChange={onChangeRoomtype}>
                        {
                            singleHotel.Roomtypes.map((data) => <Select.Option key={data.id} value={data.id}>{data.name}</Select.Option>)
                        }
                  </Select>)}
            </InputWrapper>
            <InputWrapper>
            <PeopleInputLabel>  NumberOfRoom : </PeopleInputLabel>
            <PeopleInput placeholder='numberOfRoom' onChange={onChangeNumberOfRoom} value={numberOfRoom} type="number"/>
            </InputWrapper>
            <InputWrapper>
            <PeopleInputLabel>{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'} {'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'} extrabed : </PeopleInputLabel>
            <PeopleInput placeholder='extrabed' onChange={onChangeExtrabed} value={extrabed} type="number"/>
            </InputWrapper>
            <InputWrapper>
            <PeopleInputLabel> {'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'} extraPerson : </PeopleInputLabel>
            <PeopleInput placeholder='extraPerson' onChange={onChangeExtraPerson} value={extraPerson}  type="number"/>
            </InputWrapper>
            <FilterSection>
           {'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'} period :{'\u00A0'}
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
            <InputWrapper>
              <PeopleButton onClick={onSubmitForm}>등록</PeopleButton>
            </InputWrapper>
          </PeopleContainer>
        </>
    )
}

export default peopleRoomtypeForm;



const PeopleContainer = styled.div`
    padding:10px;
    background-color:white;
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

const FilterSection = styled.div`
display: flex;
justify-content: center;
`

const SelectDate = styled(DatePicker)`
  height: 30px;
  padding: 6px 12px;
  font-size: 14px;
  border: 1px solid #e5e5e5;
  outline: none;
  cursor: pointer;
  @media (max-width:500px){
    padding: 0px 6px;
  font-size: 12px;
  }
`;

const BetweenDate = styled.span`
  display: table;
  padding: 5px 12px;
  background-color: #e5e5e5;
  border: 1px solid #e5e5e5;
  font-size: 12px;
`;

const DateFilter = styled.div`
  display:flex;

`
