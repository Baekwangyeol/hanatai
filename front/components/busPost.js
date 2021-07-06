import React,{useCallback} from 'react';
import styled from 'styled-components';


const busPost =({ bus }) =>{

    return(
    <>
    <BtnDiv >
    {bus.bus} 
    </BtnDiv>
    </>
    )
}

export default busPost;

const BtnDiv = styled.div`
    border:1px solid;
    display:inline-block;
    margin-right:5px;
    padding:5px;
    border-radius:10px;
`