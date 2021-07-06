import React, { useState, useCallback } from 'react';
import { Card, List, Descriptions } from 'antd';
import Link from 'next/link';

const telList = ({ tel }) => {
    
  return(
    <>
    <List.Item>
     <List.Item.Meta 
          title={<div>{tel.Country.country}폰 : {tel.tel}</div>}
        />
    </List.Item>
  </>  
)
}

export default telList;