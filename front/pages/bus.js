import React,{ useCallback ,useEffect, useState} from 'react';
import AppLayout from '../components/AppLayout';
import wrapper from '../store/configureStore';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Button } from 'antd';
import { END } from 'redux-saga';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import BusForm from '../components/busForm';
import styled from 'styled-components';
import { LOAD_BUS_REQUEST } from '../reducers/bus';
import BusPost from '../components/busPost';

const BookingDiv = styled.div`
  display:inline-block;
  width:100%;
`;

const BookingButton = styled(Button)`
  margin-bottom : 5px;
  float:right;
  margin-right: 5px;
`;

const SimpleDateBtn = styled.div`
  width: auto;
  margin-right: 15px;
  display:inline-block;
`;
const BusInput = styled.button`
padding: 10px 15px;
font-size: 14px;
text-align: center;
border: 1px solid #e5e5e5;
cursor: pointer;
margin-right:15px;
border-radius:10px;
background-color: ${props => {
  if (props.backgroundColor) return '#249D3D';
  else return '#7B838B';
}};
`

const bus = () =>{
    const { busPost } = useSelector((state) => state.bus);
    const [btnClicked, setBtnClicked] = useState("16인승");
    const [FormOpend, setFormOpend] = useState(false);
   
    const { addBusDone } = useSelector((state) => state.bus);
    
    useEffect(() => {
      if (addBusDone) {
        setFormOpend(false);
      }
    }, [addBusDone]);

    const onToggleCompany = useCallback(() => {
      setFormOpend((prev) => !prev);
    }, []);
    const handleBtnClicked = useCallback((e) => {
      setBtnClicked(e);
      console.log(e);
      console.log(new Date(new Date().getTime()  - 3 * 24 * 60 * 60 * 1000));
    },[])

    return(
        <AppLayout>
      <BookingDiv>
        <SimpleDateBtn>
       {busPost.map((v)=> (
           <BusInput
           onClick={()=> handleBtnClicked(v.bus)}
           key={v.id}
           backgroundColor={btnClicked === v.bus}
           >
             {v.bus}
            </BusInput>
       ))}
       </SimpleDateBtn>
        <BookingButton onClick={onToggleCompany}>{FormOpend === true ? '추가 닫기' : '버스 추가'}</BookingButton>
      </BookingDiv>
      {FormOpend && <BusForm/>}
            <hr/>
            버스사용내역
        </AppLayout>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(async (context)=>{
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
    context.store.dispatch({
      type: LOAD_BUS_REQUEST,
    });
    context.store.dispatch(END); // 이게있어야 석세스까지 하고 들고옴
    await context.store.sagaTask.toPromise();// 이게있어야 석세스까지 하고 들고옴
  });
  

export default bus;