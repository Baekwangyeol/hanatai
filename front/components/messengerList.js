import React, { useState, useCallback } from 'react';
import { Card, List, Descriptions } from 'antd';
import Link from 'next/link';

const messengerList = ({ account }) => {
    
  return(
    <>
    <List.Item>
     <List.Item.Meta 
          title={<div>{account.Messenger.messenger} : {account.account}</div>}
        />
    </List.Item>
  </>  
)
}

export default messengerList;