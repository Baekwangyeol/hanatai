import React from 'react';

const companyOptionDetail = ({ detail }) =>{

    return(
        <>
        {detail.detail} - 성인 : {detail.company_optiondetail.adult}  VND  아동 : {detail.company_optiondetail.child} VND
        <br/>
        </>
    )
}

export default companyOptionDetail;