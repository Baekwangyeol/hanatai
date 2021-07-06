import React from 'react';
import styled from 'styled-components';
import CodeStatusChange from './codeStatusChange';


const Status = styled.span`
    margin-left:50px;
    margin-right:20px;
    font-size:16px;
    color: blue;
`;


const codeTitle = ({ code }) =>{

return(
    <>
    <TitleCode>{code.code}</TitleCode> <Status>  status : <CodeStatusChange code={code} /></Status>  
    {/* 총인원 : {code.reservecodes[0] && code.reservecodes[0].reservePeople[0].adult}+
    {code.reservecodes[0] && code.reservecodes[0].reservePeople[0].child}c+
    {code.reservecodes[0] && code.reservecodes[0].reservePeople[0].infant}i */}
    </>
)
}

export default codeTitle;

const TitleCode = styled.div`
      font-size:20px;
      margin: 10px;
`