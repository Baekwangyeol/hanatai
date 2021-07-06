import React, { useState, useCallback } from 'react';
import { Card, List, Descriptions } from 'antd';
import ContactInfo from './contactInfo';
import Link from 'next/link';


const contactList = ({ contact }) => {

    const [FormOpend, setFormOpend] = useState(false);

    const onToggleComment = useCallback (()=>{
        setFormOpend((prev)=> !prev);
    },[])
    
  return(
    <>
    <List.Item>
     <List.Item.Meta 
          title={<div onClick={onToggleComment}>{contact.name} - {contact.Company.company}</div>}
          description={contact.email}
        />
    </List.Item>
        {FormOpend &&
        (
        <Card style={{ backgroundColor:'#FAFAFA'}}>
            <Card.Meta
              description={<ContactInfo contact={contact} />}
         />
         </Card>
        )} 
  </>  
)
}

export default contactList;