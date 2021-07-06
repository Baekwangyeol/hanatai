import React,{useState,useCallback,useEffect} from 'react';
import { Card,Button ,Modal } from 'antd';
import { useSelector } from 'react-redux';
import { ArrowDownOutlined,ArrowUpOutlined } from '@ant-design/icons';
import styled,{ createGlobalStyle } from 'styled-components';
import PeopleForm from './peopleForm';
import ReservepeopleCard from './reservepeopleCard';

const Global = createGlobalStyle`
   .ant-card {
    margin-bottom:10px;
    }
    .ant-card-type-inner .ant-card-body{
      padding: 0px;
    }

`;

const BookingDiv = styled.div`
  display:inline-block;
  width:100%;
`;

const BookingButton = styled(Button)`
  margin-bottom : 5px;
  float:right;
  margin-right: 5px;
`;

function error(err) {
  Modal.error({
    content: err,
  });
}


const ReserveCard = ({ reserve }) => {
  const [FormOpend, setFormOpend] = useState(false);
  const onToggleCompany = useCallback(() => {
    setFormOpend((prev) => !prev);
  }, []);

  const { addPeopleDone,addPeopleError } =useSelector((state) => state.booking);
  useEffect(() => {
    if (addPeopleDone) {
      setFormOpend(false);
    } else if (addPeopleError) {
      error(addPeopleError);
    }
  }, [addPeopleDone, addPeopleError]);
       

    return(
        <>
        <Global/>
         <ReserveCodeCard>
           <ReserveCodeTitle>
             {reserve.reservecode}
             {FormOpend === false 
                  ?(<><RegisterForm onClick={onToggleCompany}>인원추가<ArrowDownOutlined /></RegisterForm></>) 
                  :(<><RegisterForm onClick={onToggleCompany}>인원닫기<ArrowUpOutlined /></RegisterForm></>) }
            </ReserveCodeTitle>
            <ContentWrapper>
              { FormOpend && (<PeopleForm reserve={reserve}/>)}
            {reserve.reservePeople.map((v) =>
                    <ReservepeopleCard key={v.id} people={v}/>
            )}     
            </ContentWrapper>
             </ReserveCodeCard> 
        </>
    )

}

export default ReserveCard;

const ReserveCodeCard = styled.div`
border:1px solid;
border-radius:10px;
margin-top:8px;

`

const ReserveCodeTitle = styled.div`
  text-align:center;
  height: 50px; line-height: 50px;
  background-color:#BBC68C;
  border:1px solid;
  border-radius:10px;
  position: relative; 
`

const RegisterForm = styled.div`
    cursor:pointer;
    position:absolute;
    right: 0;
    bottom:0;
`


const ContentWrapper =styled.div`
display:block;
`