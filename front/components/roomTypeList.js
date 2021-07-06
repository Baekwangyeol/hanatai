import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Card, List, Descriptions } from 'antd';
import Link from 'next/link';
import RoomTypeCard from './roomTypeCard';


const roomTypeList = ({ roomtype }) => {

  return(
    <>
    <List

    itemLayout="vertical" 
    dataSource={roomtype}
    renderItem={(item) => (
        <RoomTypeCard roomtypes={item}/>
    )}
  />
  </>  
)
}
export default roomTypeList;