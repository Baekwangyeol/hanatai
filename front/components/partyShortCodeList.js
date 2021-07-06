import React from 'react';
import styled from 'styled-components';

const partyShortCodeList = ({ code }) => {

    return(
        <>
         <PartyContainer>
            <PartyCode>
             {code}
            </PartyCode>
        </PartyContainer>
        </>
    )
}


export default partyShortCodeList;

const PartyContainer = styled.div`
    display:flex;
`

const PartyCode = styled.div`
     border:1px ;
     border-radius:8px;
     font-size:20px;
     padding: 0 20px 0 20px;
     text-align:center;
     width: 200px;
     background-color:#5D66C8;
     margin:8px 10px;
     color: #E3A521;
`

