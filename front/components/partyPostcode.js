import React from 'react';
import styled from 'styled-components';
import { CloseOutlined } from '@ant-design/icons';


const PartyCode = styled.div`
    display: inline-block;
    margin-right:10px;
    border:1px solid ;
    padding:10px;
    border-radius:10px;
    width:10%
`
const Codewrap = styled.div`
display: inline-block;
color:red;
`
const Iconwrap = styled.div`
    float:right;
    cursor:pointer;
`

const partyPostcode = ({ code }) =>{

    return(
        <>
        <PartyCode>
            <Codewrap> {code.code}</Codewrap>
            <Iconwrap> <CloseOutlined /></Iconwrap>
        </PartyCode>
        </>
    )
}

export default partyPostcode;