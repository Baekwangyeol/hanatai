import React, { useState } from 'react';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { BiEdit } from 'react-icons/bi';
import { MdDeleteForever } from 'react-icons/md';
import styled from 'styled-components';
import Link from 'next/link';

const reserveTableTd = ({ item, onDeleteOpen, onCodOpen, onOtherCodeOpen }) => {
  const today = new Date();

  const DeleteModal = (item) => {
    onDeleteOpen(item);
  };

  const CodEditModal = (cod, checkindate, id) => {
    onCodOpen(cod, checkindate, id);
  };

  const OthercodeEditModal = (othercode, id) => {
    onOtherCodeOpen(othercode, id);
  };

  // const CODModal = ()=>{
  //     let Codplus =parseInt(Cod)+1;
  //     let baba = dayjs(item.checkInDate);
  //     let d2 = baba.subtract(Codplus,'day');
  //     console.log(d2.format('YYYY-MM-DD'));
  //     setCodModalOpen(false);
  // }

  return (
    <>
      <Link href={`/booking/${item.id}`}>
        <TableTr>
          <td>{item.code}</td>
          <td>{dayjs(item.firstday).format('YYYY-MM-DD')}</td>
          <td>{dayjs(item.lastday).format('YYYY-MM-DD')} </td>
          <td> {item.User && item.User.name} </td>
          <td>
            {dayjs(today).format('YYYY-MM-DD') ===
            dayjs(item.createdAt).format('YYYY-MM-DD') ? (
              <>{dayjs(item.createdAt).fromNow()}</>
            ) : (
              <>{dayjs(item.createdAt).format('YYYY-MM-DD')}</>
            )}{' '}
          </td>
          <td>{item.status}</td>
          <td>
            <EditIcon />
          </td>
          <td>
            <DeleteIcon onClick={() => DeleteModal(item.id)} />
          </td>
        </TableTr>
      </Link>
    </>
  );
};

export default reserveTableTd;

const DeleteIcon = styled(MdDeleteForever)`
  font-size: 24px;
  cursor: pointer;
  :hover {
    font-size: 30px;
  }
`;

const EditIcon = styled(BiEdit)`
  font-size: 24px;
  cursor: pointer;
  :hover {
    font-size: 30px;
  }
`;

const TableTr = styled.tr`
  cursor: pointer;
  :hover {
    font-size: 15px;
    border: 1px solid;
  }
`;
