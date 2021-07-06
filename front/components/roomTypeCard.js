import React, { useState, useCallback } from 'react';
import {  List,Button } from 'antd';
import Link from 'next/link';
import RoomTypeImage from './roomTypeImage';
import dayjs from 'dayjs';
import styled from 'styled-components';
import AddRoomPrice from './addRoomPrice';

const Container = styled.div`
  padding:0;
  margin:0;
  box-sizing:border-box;
`;
const Course = styled.div`
  border-radius:10px;
  box-shadow: 0px 10px 10px rgba(0,0,0,.2);
  display:flex;
  max-width:100%;
  overflow:hidden;
  

  @media only screen and (max-width: 768px) {
    display:block;
    text-align:center;
  }
`;
const Price = styled.div`
  background: #e40046;
  color:#fff;
  padding :20px;
  width:500px;
`;
const Info = styled.div`
  padding:30px;
  width:100%;

  @media only screen and (max-width: 1040px) {
    width:400px;
  }
  @media only screen and (max-width: 1300px) {
    width:400px;
  }
`;
const ImageSl = styled.div`
  width:200px;
  height:200px;

  @media only screen and (max-width: 768px) {
    width:0;
    height:0;
  }
`;
const Content = styled.div`
  display:flex;
  padding:8px;

  @media only screen and (max-width: 768px) {
    display:block;
  }
`;
const ContentCard = styled.div`
    display:flex;
    width: 140px;
    padding: 8px; 
    border: 1px solid; 
    border-radius: 10px; 
    background-color: #f2f2f2;
    margin-left:8px;
    overflow:hidden;

    @media only screen and (max-width: 768px) {
      display:block;
      width:100%;
    }
`;

const Pricetag = styled.div`
  border-radius: 10px 10px 0 0;
  background-color:white;
  color:black;
  padding:5px;
`;

const PriceCard = styled.div`
    display:block;
    background-color:grey;
    margin-bottom:5px;
    `;

const Period = styled.div`
  display:inline;
  margin-left:30px;
  font-size:15px;
  `;
const PriceT = styled.div`
  float:right;
  margin-right:40px;
  font-size:15px;
`;
const PriceButton = styled(Button)`
  float:right;
`;

const roomTypeCard = ({ roomtypes }) => {
   dayjs.locale('ko');
    const [FormOpend, setFormOpend] = useState(false);
    const onToggleComment = useCallback (()=>{
        setFormOpend((prev)=> !prev);
    },[])
    
  return(
    <>
      <List.Item>
        <Container>
        <Course>
        <ImageSl>
          <RoomTypeImage />
        </ImageSl>
        <Info>
         <h2>{roomtypes.name}</h2>
         <Content>
            <ContentCard >
              <span><h3>person</h3> 2+2 <br></br> 3+0  </span>
              <AddRoomPrice roomtype={roomtypes} />
            </ContentCard>
            <ContentCard>
              <span><h3>extrabed</h3>{roomtypes.extrabed ? '가능' : '불가능'}</span>
            </ContentCard>
            <ContentCard>
              <span><h3>view</h3>{roomtypes.view}</span>
            </ContentCard>
            <ContentCard>
              <span><h3>bath</h3>{roomtypes.bath ? '유' : '무'}</span>
            </ContentCard>
            <ContentCard>
              <span><h3>NumberOfRoom</h3>총 {roomtypes.numberOfRoom}개의 룸</span>
            </ContentCard>
         </Content>
        </Info>
        <Price>
          <Pricetag>
            <Period>  period  </Period>
            <PriceT>  price  </PriceT>
          </Pricetag>
         {roomtypes.Roomprices && roomtypes.Roomprices.map((v)=>(
                 <PriceCard key={v.id}>
                   {dayjs(v.periodstart).format('YY/MM/DD')} ~ {dayjs(v.periodend).format('YY/MM/DD')} {v.room}$ {v.extrabed}$ {v.extraperson}$
                 </PriceCard>
                ))}
          <AddRoomPrice roomtype={roomtypes} />
        </Price>
        </Course>
        </Container>
      </List.Item>
  </>
)
}

export default roomTypeCard;