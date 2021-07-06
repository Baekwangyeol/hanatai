import React from 'react';

const opCompany = ({ company }) =>{

    return (
        <>
        {company.company} 성인 - {company.company_optiondetail.adult}VND 아동 - {company.company_optiondetail.child}VND
        </>
    )
}

export default opCompany;