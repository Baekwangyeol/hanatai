import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import { LOAD_DETAIL_REQUEST } from '../reducers/option';
import { ADD_RESERVEOPTION_REQUEST } from '../reducers/booking';
import Select from 'react-select';

const reserveOptionForm = ({ people }) => {
  const dispatch = useDispatch();
  const { optionPost, detailPost } = useSelector((state) => state.option);
  const [option, setOption] = useState('');
  const [detail, setDetail] = useState('');
  const [adult, setAdult] = useState('');
  const [child, setChild] = useState('');
  const [startDate, setStartDate] = useState('');

  const onChangeOption = useCallback(
    (e) => {
      const optionTarget = e.target.value;
      setOption(e);
      setDetail(null);
      dispatch({
        type: LOAD_DETAIL_REQUEST,
        data: optionTarget,
      });
    },
    [option]
  );

  const onChangeDetail = useCallback(
    (e) => {
      setDetail(e.target.value);
    },
    [detail]
  );

  const onChangeAdult = useCallback(
    (e) => {
      setAdult(e.target.value);
    },
    [adult]
  );

  const onChangeChild = useCallback(
    (e) => {
      setChild(e.target.value);
    },
    [child]
  );

  const onSubmitForm = () => {
    dispatch({
      type: ADD_RESERVEOPTION_REQUEST,
      data: { detail, adult, child, peopleId: people.id },
    });
  };

  return (
    <>
      <PeopleContainer>
        <PeopleTitleForm>옵션 추가</PeopleTitleForm>
        <hr />
        <InputWrapper>
          <PeopleInputLabel>Option: </PeopleInputLabel>
          <select onChange={onChangeOption}>
            <option value="0">--option--</option>
            {optionPost.map((data) => (
              <option key={data.id} value={data.id}>
                {data.option}
              </option>
            ))}
          </select>
          {detailPost[0] ? (
            <>
              <select onChange={onChangeDetail}>
                <option value="">--detail--</option>
                {detailPost.map((data) => (
                  <option key={data.id} value={data.id}>
                    {data.detail}
                  </option>
                ))}
              </select>
            </>
          ) : null}
        </InputWrapper>
        <InputWrapper>
          <PeopleInputLabel> {'\u00A0'} Adult : </PeopleInputLabel>
          <PeopleInput
            placeholder="adult"
            onChange={onChangeAdult}
            value={adult}
            type="number"
          />
        </InputWrapper>
        <InputWrapper>
          <PeopleInputLabel>{'\u00A0'} Child : </PeopleInputLabel>
          <PeopleInput
            placeholder="child"
            onChange={onChangeChild}
            value={child}
            type="number"
          />
        </InputWrapper>
        <FilterSection>
          Date :{'\u00A0'}
          <DateFilter>
            <SelectDate
              selected={startDate}
              dateFormat="yyyy-MM-dd"
              onChange={(date) => setStartDate(date)}
              placeholderText="클릭해주세요."
            />
          </DateFilter>
        </FilterSection>
        <InputWrapper>
          <PeopleButton onClick={onSubmitForm}>등록</PeopleButton>
        </InputWrapper>
      </PeopleContainer>
    </>
  );
};

export default reserveOptionForm;

const PeopleContainer = styled.div`
  padding: 10px;
  background-color: white;
`;

const PeopleTitleForm = styled.div`
  margin-left: 16px;
  font-size: 16px;
  display: block;
  margin-bottom: 8px;
`;

const PeopleInput = styled.input``;

const PeopleInputLabel = styled.div`
  display: inline-block;
  font-size: 16px;
  margin-right: 5px;
`;

const InputWrapper = styled.div`
  display: block;
  margin-bottom: 16px;
  margin-top: 10px;
  text-align: center;
`;

const PeopleButton = styled.button`
  background-color: #69ca82;
  border: 1px;
  border-radius: 10px;
  margin-left: 24px;
  width: 200px;
  height: 30px;
  cursor: pointer;
`;

const FilterSection = styled.div`
  display: flex;
  justify-content: center;
`;

const SelectDate = styled(DatePicker)`
  height: 30px;
  padding: 6px 12px;
  font-size: 14px;
  border: 1px solid #e5e5e5;
  outline: none;
  cursor: pointer;
  @media (max-width: 500px) {
    padding: 0px 6px;
    font-size: 12px;
  }
`;

const DateFilter = styled.div`
  display: flex;
`;
