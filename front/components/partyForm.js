import React,{useState,useCallback,useEffect} from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch} from 'react-redux';
import dayjs from 'dayjs';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ADD_PARTY_REQUEST } from '../reducers/party';


const partyForm = () =>{
    const dispatch = useDispatch();
    const { addPartyDone } =useSelector((state) => state.party);
    const [party, setParty] = useState('');
    const [startDate, setStartDate] = useState();
    useEffect(() => {
      if (addPartyDone) {
        setParty('');
        setStartDate('');
      }
    }, [addPartyDone]);

    const onChangeParty = useCallback((e) => {
        setParty(e.target.value);
    }, [party]);
    
    const onSubmitForm = () => {
      // if(startDate === ''){
      //   return error('날짜를 입력해주세요');
      // }
      // if(party === ''){
      //   return error('파티명 입력해주세요');
      // }
        dispatch({
          type: ADD_PARTY_REQUEST,
          data:{ party: '#'+party+dayjs(startDate).format('YYMMDD'), startDate },
        })
    };

    return (
         <>
          <PartyWrapper>
            <PartyFlex>
                <LabelWrapper>파티명 : 
                  <PartyInput 
                  type="text" 
                  onChange={onChangeParty} 
                  placeholder="party"/>
                </LabelWrapper>
              <DateWrapper>날짜 : 
              <SelectDate
                selected={startDate}
                dateFormat="yyyy-MM-dd"
                onChange={(date) => setStartDate(date)}
                placeholderText="클릭해주세요."
               />
               </DateWrapper>
              <ButtonInput onClick={onSubmitForm}>등록</ButtonInput>
            </PartyFlex>
          </PartyWrapper>
          <hr/>
        </>
)
}

export default partyForm;

const PartyWrapper = styled.div`
    height:50px;
    margin-top:20px;
    display:flex;
    justify-content: center;
`

const ButtonInput = styled.button`
  padding:5px 10px;
  font-size:12px;
  height:30px;
  width:120px;
  cursor:pointer;
  border-radius:10px;
  border:1px;
  margin-left:8px;
`

const LabelWrapper = styled.label`
    margin-right: 8px;
`

const DateWrapper = styled.div`
    margin-right: 8px;
`

const PartyInput = styled.input`
    outline: none;
   margin-left:8px;
   border:1px solid;
`
const PartyFlex = styled.div`
   text-align:center;
   display:flex;
`

const SelectDate = styled(DatePicker)`
  height: 30px;
  padding: 6px 12px;
  margin-left:8px;
  font-size: 14px;
  text-align: center;
  border: 1px solid #e5e5e5;
  outline: none;
  cursor: pointer;
`;
