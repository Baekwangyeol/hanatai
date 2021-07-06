import React from 'react';
import { Card } from 'antd';
import styled  from 'styled-components';

const CardM = styled(Card)`
    margin-top: 30px;
` 


const noticeCard = () =>{
    return(
         <CardM title="공지사항">
          공지사항<br/>
          공지사항<br/>
          공지사항<br/>
          공지사항<br/>
          공지사항<br/>
        </CardM>
    )
}

export default noticeCard;