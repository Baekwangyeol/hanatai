import React, { useState, useEffect,useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import { List, Typography,Row,Col,Modal} from 'antd';
import { ArrowLeftOutlined,ArrowRightOutlined } from '@ant-design/icons';
import { END } from 'redux-saga';
import dayjs from 'dayjs';
import AppLayout from '../components/AppLayout';
import BookingForm from '../components/BookingForm';
import BookingSearchForm from '../components/BookingSearchForm';
import wrapper from '../store/configureStore';
import ReserveTableTd from '../components/reserveTableTd';
import { LOADS_BOOKING_REQUEST,VIEW_MORE_REQUEST } from '../reducers/booking';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import relativeTime from 'dayjs/plugin/relativeTime';
import styled,{ createGlobalStyle } from 'styled-components';
import { all } from '@redux-saga/core/effects';


function error(err) {
  Modal.error({
    content: err,
  });
}
const Global = createGlobalStyle`
   .ant-list-item:hover {
    background-color:red;
    cursor: pointer;
    font-size:20px;
    border:1px solid;
    border-radius:10px;
    }
`;

const SearchForm = styled.div`
    display:flex;
    background-color:#E8D2D2;
    position: relative;
    @media (max-width:770px){
      display:block;
    }
    @media (max-width:400px){
      display:block;
    }
`
const RegisterForm = styled.div`
    cursor:pointer;
    position:absolute;
    right: 0;
    bottom:0;
`

const Booking = () => {
  dayjs.locale('ko');
  dayjs.extend(relativeTime);
  const dispatch = useDispatch();
  const [FormOpend, setFormOpend] = useState(false);
  const { bookingPost,hasmorePosts,addHanacodeError,addHanacodeDone } = useSelector((state) => state.booking);
  const { me } = useSelector((state) => state.user);

  const [ btnClicked, setBtnClicked ] = useState("전체");
  const [ startDate, setStartDate ] = useState(new Date());
  const [ endDate, setEndDate] = useState();
  const [ searchCode, setSearchCode ] = useState('');
  const [ checkSearch, setCheckSearch ] =useState(['check','confirm']);


  useEffect(() => {
    if (addHanacodeError) {
      error(addHanacodeError);
    }
    if(addHanacodeDone){
      setFormOpend(false);
    }
  }, [addHanacodeError,addHanacodeDone]);

  //체크박스
  const handleSingleCheck = (checked ,value) =>{
    if(checked){
      setCheckSearch([...checkSearch,value])
      console.log(checkSearch);
    }else{
      setCheckSearch(checkSearch.filter((el)=> el !== value))
    }
  }
  
  const handleAllCheck = (checked) =>{
    if(checked){
      console.log('wow');
      const checkArray=['check','confirm'];
      setCheckSearch(checkArray);
    }else{
      setCheckSearch([]);
    }
  }
 
  
  const onChangeSearch = (e)=>{
    setSearchCode(e.target.value);
  }

       // 날짜 버튼 클릭, 기간 변경 기능
       const handleBtnClicked = (e) => {
        console.log(e);
        const value = e;
        setBtnClicked(value);
        const currentDate = new Date();
        // 기본값: placeholder 내용
        if (value === "전체") {
          setStartDate(new Date());
          setEndDate();
        }
        // 오늘 날짜
        if (value === "오늘") {
          setStartDate(new Date());
          setEndDate(new Date());
        }
        // 3일 전부터 오늘까지의 기간
        if (value === "3일") {
          let threeDaysAgo = new Date(
            currentDate.getTime() + 3 * 24 * 60 * 60 * 1000
          );
          setStartDate(new Date());
          setEndDate(threeDaysAgo);
        }
        // 1주일 전부터 오늘까지의 기간
        if (value === "1주일") {
          let weekAgo = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);
          setStartDate(new Date());
          setEndDate(weekAgo);
        }
        // 1개월 전부터 오늘까지의 기간
        if (value === "1개월") {
          let oneMonthAgo = new Date(
            new Date().getFullYear(),
            new Date().getMonth() + 1,
            new Date().getDate()
          );
          setStartDate(new Date());
          setEndDate(oneMonthAgo);
        }
        // 3개월 전부터 오늘까지의 기간
        if (value === "3개월") {
          let threeMonthAgo = new Date(
            new Date().getFullYear(),
            new Date().getMonth() + 3,
            new Date().getDate()
          );
          setStartDate(new Date());
          setEndDate(threeMonthAgo);
        }
      };

  const Search = (start,end,search,checkSearch) =>{
    console.log(start, end);
    //체크만 체크했을경우 
    if(!checkSearch.includes('confirm') && checkSearch.includes('check')){
      //end값이 있는경우
      if(end !== undefined){
          return (
            dispatch({
              type: LOADS_BOOKING_REQUEST,
              search,
                start: dayjs(start).format('YYYYMMDD'),
                end: dayjs(end).format('YYYYMMDD'),
                status: 'check',
            })
          )
      }
      //end값 없는경우
      return (
        dispatch({
          type: LOADS_BOOKING_REQUEST,
            search,
            start: dayjs(start).format('YYYYMMDD'),
            status: 'check',
        })
      )
      //확정만 볼경우
    }else if (!checkSearch.includes('check') && checkSearch.includes('confirm')){
      if(end !== undefined){
        return (
          dispatch({
            type: LOADS_BOOKING_REQUEST,
              search,
              start: dayjs(start).format('YYYYMMDD'),
              end: dayjs(end).format('YYYYMMDD'),
              status: 'confirm',
          })
        )
      }
      //end값 없는경우
      return (
        dispatch({
          type: LOADS_BOOKING_REQUEST,
            search,
            start: dayjs(start).format('YYYYMMDD'),
            status: 'confirm',
        })
      )
      }else if(checkSearch.includes('confirm') && checkSearch.includes('check')){
        if(end !== undefined){
        return (
          dispatch({
            type: LOADS_BOOKING_REQUEST,
              search,
              start: dayjs(start).format('YYYYMMDD'),
              end: dayjs(end).format('YYYYMMDD'),
              status: 'all',
          })
        )
      }
      //end값 없는경우
      return (
        dispatch({
          type: LOADS_BOOKING_REQUEST,
            search,
            start: dayjs(start).format('YYYYMMDD'),
            status: 'all',
        })
      )
      }
      return error('예약체크 확정 체크해주세요');
    }

 
  const onToggleForm = useCallback(() => {
    setFormOpend((prev) => !prev);
  }, []);

  const onChangeViewMore = () => {
    const start =dayjs(bookingPost[bookingPost.length - 1]?.firstday).format('YYYYMMDD');
    const lastId = bookingPost[bookingPost.length -1]?.id;
    console.log(startDate,endDate,searchCode,checkSearch);
    if(!checkSearch.includes('confirm') && checkSearch.includes('check')){
      //end값이 있는경우
      if(endDate !== undefined){
          return (
            dispatch({
              type: VIEW_MORE_REQUEST,
              search: searchCode,
                start: start,
                end: dayjs(endDate).format('YYYYMMDD'),
                status: 'check',
                lastId,
            })
          )
      }
      //end값 없는경우
      return (
        dispatch({
          type: VIEW_MORE_REQUEST,
          search: searchCode,
            start: start,
            status: 'check',
            lastId,
        })
      )
      //확정만 볼경우
    }else if (!checkSearch.includes('check') && checkSearch.includes('confirm')){
      if(endDate !== undefined){
        return (
          dispatch({
            type: VIEW_MORE_REQUEST,
            search: searchCode,
              start: start,
              end: dayjs(endDate).format('YYYYMMDD'),
              status: 'confirm',
              lastId,
          })
        )
      }
      //end값 없는경우
      return (
        dispatch({
          type: VIEW_MORE_REQUEST,
            search: searchCode,
            start: start,
            status: 'confirm',
            lastId,
        })
      )
      }else if(checkSearch.includes('confirm') && checkSearch.includes('check')){
        if(endDate !== undefined){
        return (
          dispatch({
            type: VIEW_MORE_REQUEST,
            search: searchCode,
              start: start,
              end: dayjs(endDate).format('YYYYMMDD'),
              status: 'all',
              lastId,
          })
        )
      }
      //end값 없는경우
      return (
        dispatch({
          type: VIEW_MORE_REQUEST,
          search: searchCode,
            start: start,
            status: 'all',
            lastId,
        })
      )
      }
      return error('예약체크 확정 체크해주세요');
  }


  return (
    <AppLayout>
      <Global/>
      <SearchForm >
      <BookingSearchForm 
      Search={Search}
      handleBtnClicked={handleBtnClicked}
      startDate={startDate}
      btnClicked={btnClicked}
      setStartDate={setStartDate}
      endDate={endDate}
      checkSearch={checkSearch}
      searchCode={searchCode}
      setEndDate={setEndDate}
      handleSingleCheck={handleSingleCheck}
      handleAllCheck={handleAllCheck}
      onChangeSearch={onChangeSearch}
      />
      {FormOpend === false 
      ?(<><RegisterForm onClick={onToggleForm}>등록폼열기<ArrowLeftOutlined /></RegisterForm></>) 
      :(<><RegisterForm onClick={onToggleForm}>등록폼닫기<ArrowRightOutlined /></RegisterForm></>) }
      {FormOpend === true ?  <BookingForm /> : null}
      </SearchForm>
      {/* <BookingSearch /> */}
      <TableContainer>
              <TableTitle>예약내역</TableTitle>
              <TableReserve>
                <thead>
                  <tr>
                  <th>Hanacode</th>
                  <th>CheckInDate</th>
                  <th>CheckOutDate</th>
                  <th>Writer</th>
                  <th>WriteDate</th>
                  <th>Status</th>
                  <th>Edit</th>
                  <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                { 
                      bookingPost[0]  && bookingPost.map((v)=>
                          <ReserveTableTd 
                          key={v.id} 
                          item={v} 
                         />
                        )
                    }
                </tbody>
              </TableReserve>
              {hasmorePosts && 
              <ViewMore>
              <button onClick={onChangeViewMore}>더보기</button>
             </ViewMore>
              }
              
            </TableContainer>
    </AppLayout>
  );
};

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
    type: LOADS_BOOKING_REQUEST,
  });
  context.store.dispatch(END); // 이게있어야 석세스까지 하고 들고옴
  await context.store.sagaTask.toPromise();// 이게있어야 석세스까지 하고 들고옴
});

export default Booking;


const TableContainer = styled.div`
`

const TableReserve = styled.table`
border-collapse: collapse;
width: 100%;
  th{
    background-color: #4CAF50;
    color: white;
  }
  tr:nth-child(even){background-color: #f2f2f2}
  th, td {
    padding: 8px;
    text-align: center;
  }
  
`

const TableTitle = styled.div`
  text-align:center;
  font-size:20px; 
`
const ViewMore = styled.div`
  text-align:center;
  margin-top:20px;
`