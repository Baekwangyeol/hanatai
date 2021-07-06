import React from 'react';
import OpCompany from './opCompany';


const optionInfo = ({ option }) =>{

    return (
    <>
        <span>옵션가</span>
        <br/>
        {option.detail} - 성인 {option.adult}$ 아동 {option.child}$
        <br/>
        <br/>
        <span>네트가</span>
        <br/>
        {option.OpCompany.map((v) =>
         <OpCompany key={v.id} company={v}/>
         )}
        <br/>
        <br/>
    </>
)
}

export default optionInfo;