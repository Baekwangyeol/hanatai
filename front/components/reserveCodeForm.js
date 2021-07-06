import React, { useState, useCallback } from 'react';
import { Button, Form, Row, Col, Input, Select, Modal } from 'antd';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { ADD_RESERVECODE_REQUEST } from '../reducers/booking';

function error(err) {
  Modal.error({
    content: err,
  });
}

const reserveCodeForm = ({ hanacode }) => {
  const dispatch = useDispatch();
  const [reservecode, setReservecode] = useState('');

  const onChangeReservecode = useCallback(
    (e) => {
      setReservecode(e.target.value);
    },
    [reservecode]
  );

  const onSubmitForm = useCallback(() => {
    dispatch({
      type: ADD_RESERVECODE_REQUEST,
      data: { reservecode, bookingId: hanacode.id },
    });
  }, [reservecode]);

  return (
    <>
      <ReservecodeForm>
        <ReserveInputLabel>예약코드 : </ReserveInputLabel>
        <ReserveInput
          placeholder="Reservecode"
          onChange={onChangeReservecode}
          value={reservecode}
        />
        <ReserveCodeButton onClick={onSubmitForm}>등록</ReserveCodeButton>
      </ReservecodeForm>
    </>
  );
};

export default reserveCodeForm;

const ReservecodeForm = styled.div`
  display: flex;
  padding: 10px;
  background-color: #e8d2d2;
  border: 1px solid;
`;

const ReserveInput = styled.input`
  width: 200px;
`;
const ReserveInputLabel = styled.div`
  display: inline-block;
  font-size: 16px;
  margin-right: 5px;
  margin-left: 50px;
`;
const ReserveCodeButton = styled.button`
  background-color: #69ca82;
  border: 1px;
  border-radius: 10px;
  margin-left: 5px;
  width: 50px;
`;
