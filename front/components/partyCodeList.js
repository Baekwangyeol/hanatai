import React, { useState } from 'react';
import styled from 'styled-components';
import { BiEdit } from 'react-icons/bi';
import PartyInHotelList from './partyInHotelList';
import PartyInOptionList from './partyInOptionList';
import { MdDeleteForever } from 'react-icons/md';
import Modalmade from './Modal/Modal';

const partyCodeList = (props) => {
  // idx={index2}
  // reservecode={obj}
  // hanacode={v}
  // rows={v.reservecodes.length}
  const { idx, reservecode, hanacode, rows } = props;
  const [EditMode, setEditMode] = useState(false);
  const [EditConfirmCheck, setEditConfirmCheck] = useState(false);
  const [DeleteConfirmCheck, setDeleteConfirmCheck] = useState(false);

  const onChangeEditMode = () => {
    setEditMode((prev) => !prev);
  };

  const onChangeContent = () => {
    setEditConfirmCheck((prev) => !prev);
  };
  const onDeleteOpen = () => {
    setDeleteConfirmCheck((prev) => !prev);
  };

  const closeModal = () => {
    setEditConfirmCheck(false);
    setDeleteConfirmCheck(false);
  };

  return (
    <>
      {idx === 0 ? <td rowSpan={rows}>{hanacode} </td> : null}
      <td>{reservecode.reservecode}</td>
      <td style={{ width: 380 }}>
        {reservecode.reservePeople.map((v, index) => {
          return v.roomtypeReserves.map((obj, index2) => {
            return (
              <tr key={index} style={{ padding: 8 }}>
                <PartyInHotelList
                  key={index2}
                  idx={index2}
                  hotel={obj}
                  People={v}
                  rows={v.roomtypeReserves.length}
                />
              </tr>
            );
          });
        })}
      </td>
      <td>dw</td>
      <td>
        <PartyInOptionList />{' '}
      </td>
      <td>
        <tr>dr</tr>
      </td>
      <td></td>

      {/* <PartyContainer>
            <PartyCode>
             {code.code}
            </PartyCode>
            <PartyContent>
                {EditMode === true 
                ? <TextInput></TextInput>
                : "바보"}
            </PartyContent>
            <EditContent>
                {EditMode === true 
                ? (<>
                <ButtonWrapper>
                <EditButton backgroundColor={false} onClick={onChangeContent}>수정</EditButton>
                <EditButton onClick={onChangeEditMode} backgroundColor={true}>취소</EditButton>
                </ButtonWrapper>
                </>) 
                : <EditIcon onClick={onChangeEditMode}/>}
            </EditContent>
            <DeleteContent>
            <DeleteIcon onClick={onDeleteOpen}/>
            </DeleteContent>
            </PartyContainer> */}
      <Modalmade></Modalmade>
      <Modalmade
        open={EditConfirmCheck}
        data="dd"
        close={closeModal}
        ok="d"
        header="내용 수정"
      >
        수정하시겠습니까?
      </Modalmade>
      <Modalmade
        open={DeleteConfirmCheck}
        data="dd"
        close={closeModal}
        ok="d"
        header="코드 제거"
      >
        이 코드를 해당 파티에서 제거하시겠습니까?
      </Modalmade>
    </>
  );
};

export default partyCodeList;

const PartyContainer = styled.div`
  display: flex;
`;

const PartyCode = styled.div`
  border: 1px;
  border-radius: 8px;
  font-size: 20px;
  padding: 0 20px 0 20px;
  text-align: center;
  width: 200px;
  background-color: #5d66c8;
  margin: 8px 10px;
  color: #e3a521;
`;

const PartyContent = styled.div`
  background-color: #5d66c8;
  width: 100%;
  margin: 8px 10px;
  border: 1px solid #fff;
  padding: 8px 8px 2px 8px;
`;

const EditContent = styled.div`
  width: 10%;
  margin: 8px 10px;
  text-align: center;
`;

const DeleteContent = styled.div`
  width: 5%;
  margin: 8px 10px;
  text-align: center;
`;

const DeleteIcon = styled(MdDeleteForever)`
  font-size: 24px;
  cursor: pointer;
  margin-top: 10px;
  :hover {
    font-size: 30px;
  }
`;

const EditIcon = styled(BiEdit)`
  font-size: 24px;
  margin-top: 10px;
  cursor: pointer;
  :hover {
    font-size: 30px;
  }
`;

const TextInput = styled.textarea`
  width: 100%;
  height: 50px;
  resize: none;
`;

const EditButton = styled.button`
  margin-top: 10px;
  height: 30px;
  border: 1px;
  margin-right: 8px;
  border-radius: 10px;
  cursor: pointer;
  width: 80px;
  font-size: 16px;
  background-color: ${(props) => {
    if (props.backgroundColor) return '#7B838B';
    else return '#394FE4';
  }};
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
