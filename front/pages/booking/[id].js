import React,{useState,useCallback,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter} from 'next/router';
import Head from 'next/head';
import { END } from 'redux-saga';
import { Card ,Button,Modal} from 'antd';
import { ArrowUpOutlined,ArrowDownOutlined } from '@ant-design/icons';
import axios from 'axios';
import wrapper from '../../store/configureStore';
import AppLayout from '../../components/AppLayout';
import ReserveCard from '../../components/reserveCard';
import ReserveCodeForm from '../../components/reserveCodeForm';
import CodeTitle from '../../components/codeTitle';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import { LOAD_BOOKING_REQUEST } from '../../reducers/booking';
import { LOAD_HOTELS_REQUEST } from '../../reducers/hotel';
import { LOAD_OPTION_REQUEST } from '../../reducers/option';
import styled,{ createGlobalStyle } from 'styled-components';

const Global = createGlobalStyle`
   .ant-card-body {
   padding:0;
    } 
`;

function error(err) {
  Modal.error({
    content: err,
  });
}

const Booking = () =>{
    const router = useRouter();
    const { id } = router.query;
    const { singleBooking, addReservecodeError, addReservecodeDone} = useSelector((state =>state.booking));
    const [baba, setbaba] = useState(0);
    const [FormOpend, setFormOpend] = useState(false);
 
    const onToggleCompany = useCallback(() => {
      setFormOpend((prev) => !prev);
    }, []);


    useEffect(() => {
     if (addReservecodeError) {
        error(addReservecodeError);
      }
      if(addReservecodeDone) {
        setFormOpend(false)
      }
    }, [addReservecodeError,addReservecodeDone]);

   

    return (
        <>
         <Global/>
        <AppLayout>
            {singleBooking && (
                <Head>
                    <title>
                        {singleBooking.code}
                    </title>
                </Head>
            )}
             {singleBooking && (
          <Container>
            <TitleWrapper>
            <CodeTitle code={singleBooking}/>
           
              {FormOpend === false 
                  ?(<><RegisterForm onClick={onToggleCompany}>예약번호추가<ArrowDownOutlined /></RegisterForm></>) 
                  :(<><RegisterForm onClick={onToggleCompany}>예약번호닫기<ArrowUpOutlined /></RegisterForm></>) }
              </TitleWrapper>
              <ContentWrapper>
              { FormOpend && (<ReserveCodeForm hanacode={singleBooking}/>)}
            {singleBooking.reservecodes && singleBooking.reservecodes.map((v) =>
                <ReserveCard key={v.id} reserve={v}/>
            )}    
            </ContentWrapper>
          </Container>
   
        )}
        </AppLayout>
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    const cookie = context.req ? context.req.headers.cookie : '';
    console.log(context);
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
        axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
    });
    context.store.dispatch({
      type: LOAD_HOTELS_REQUEST,
    });
    context.store.dispatch({
      type: LOAD_OPTION_REQUEST,
    });
    context.store.dispatch({
        type: LOAD_BOOKING_REQUEST,
        data: context.params.id,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
});

export default Booking;


const Container = styled.div`
  display:block;
`

const TitleWrapper = styled.div`
  border : 1px solid;
  display:block;
  position: relative;
  padding:10px;
`

const ContentWrapper =styled.div`
display:block;
`

const RegisterForm = styled.div`
    cursor:pointer;
    position:absolute;
    right: 0;
    bottom:0;
`
