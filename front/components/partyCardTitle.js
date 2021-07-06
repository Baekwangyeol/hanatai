import React from 'react';
import dayjs from 'dayjs';
import { CheckOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const PartyName = styled.div`
  display: inline-block;
  margin-right: 15px;
`;
const DateStart = styled.div`
  display: inline-block;
  margin-left: 15px;
  margin-right: 15px;
`;

const partyCardTitle = ({ party }) => {
  return (
    <>
      <PartyName>{party.party}</PartyName>
      가이드:{' '}
      {party.User === null ? (
        '미정'
      ) : (
        <>
          {party.User.name} <CheckOutlined />
        </>
      )}
      <DateStart>날짜 : {dayjs(party.startdate).format('YY/MM/DD')}</DateStart>
      <DateStart>
        {party.airnumber && (
          <>
            {party.airnumber.number}({party.airnumber.departureSpace}:{' '}
            {party.airnumber.departureTime} ~ {party.airnumber.arriveSpace}:
            {party.airnumber.arriveTime})
          </>
        )}
      </DateStart>
    </>
  );
};

export default partyCardTitle;
