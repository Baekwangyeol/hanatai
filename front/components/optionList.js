import React,{useState,useCallback } from 'react';
import { Col ,List,Card,Button } from 'antd';
import styled from 'styled-components';
import OptionInfo from './optionInfo';
import OptionDetailForm from './optionDetailForm';

const ListLi = styled(List.Item)`
  background-color:	#CED76A;
`

const BookingDiv =styled.div`
  display:inline-block;
  width:100%;
`;

const BookingButton = styled(Button)`
  margin-bottom : 5px;
  float:right;
  margin-right: 5px;
`;

const optionList = ({ option }) =>{
  const [InfoOpend, setInfoOpend] = useState(false);

  const onToggleInfoOpend = useCallback (()=>{
      setInfoOpend((prev)=> !prev);
  },[])

  const [FormOpend, setFormOpend] = useState(false);

  const onToggleDetail = useCallback (()=>{
      setFormOpend((prev)=> !prev);
  },[])


    return(
        <>
        <ListLi>
         <Col span={4} offset={5} onClick={onToggleInfoOpend}>
          {option.option} 
          </Col>
        </ListLi> 
        { InfoOpend &&
        (
        <Card style={{ backgroundColor:'#FAFAFA'}}>
            <Card.Meta
              description={option.content }
         />
          <BookingDiv>
             <BookingButton onClick={onToggleDetail}>{FormOpend === true ? '추가 닫기' : '가격 추가'}</BookingButton>

            </BookingDiv>  
            { FormOpend && (<OptionDetailForm option={option}/>)}
         {option.OptionDetails.map((v) =>
           <OptionInfo key={v.id}  option={v}/>
         )}
         </Card>
        )} 
        </>
    )
}

export default optionList;