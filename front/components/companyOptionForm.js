import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Select,Input,Button } from 'antd';
import styled from 'styled-components';
import { ADD_COMPANYOPTION_REQUEST } from '../reducers/company';

const SelectM = styled(Select)`
    width: 200px;
`
const InputM = styled(Input)`
    width:200px;
`

const companyOptionForm = ({ company }) =>{
    const dispatch = useDispatch();
    const { optionPost } = useSelector((state) => state.option);
    const [option, setOption] = useState('');
    const [detail, setDetail] = useState('');
    const [adult, setAdult] = useState('');
    const [child, setChild] = useState('');

    const [detailPost, setDetailPost] = useState([]);
    const onChangeOption = useCallback((e)=>{
        setOption(e);
        setDetail(null);
        setDetailPost(optionPost[e-1]);
    },[option])

    const onChangeDetail = useCallback((e)=>{
        setDetail(e);
        console.log(company.id);
        console.log(e);
    },[detail])

    const onChangeAdult = useCallback((e)=>{
        console.log(e.target.value);
        setAdult(e.target.value);
    },[adult])

    const onChangeChild = useCallback((e)=>{
        console.log(e.target.value);
        setChild(e.target.value);
    },[child])

    const onClickSubmit = useCallback(()=>{
        dispatch({
            type: ADD_COMPANYOPTION_REQUEST,
            data: { detail,adult,child, CompanyId: company.id},
        })
    },[detail,adult,child]);

return (
    <>
    <SelectM value={option} onChange={onChangeOption}>
         {
                optionPost.map((data) => <Select.Option key={data.id} value={data.id}>{data.option}</Select.Option>)
          }
    </SelectM>
   {detailPost.OptionDetails 
   ? <SelectM value={detail} onChange={onChangeDetail}>
         {
                detailPost.OptionDetails.map((data) => <Select.Option key={data.id} value={data.id}>{data.detail}</Select.Option>)
          }
    </SelectM>
    :null
    }
    {detail &&
       <InputM type='number' placeholder='adult' value={adult} onChange={onChangeAdult}/>
    }
    {detail &&
       <InputM type='number' placeholder='child' value={child} onChange={onChangeChild}/>
    }
    {detail &&
      <Button onClick={onClickSubmit}>등록</Button>
    }
    </>
)
}

export default companyOptionForm;