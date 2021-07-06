import React,{ useState, useEffect } from 'react';
import AppLayout from '../components/AppLayout';
import { END } from 'redux-saga';
import { Card, Switch, Modal,Button } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';
import { useSelector,useDispatch } from 'react-redux';
import { LOAD_MY_INFO_REQUEST,LOAD_GUIDE_REQUEST } from '../reducers/user';
import { LOADS_PARTY_REQUEST,VIEWMORE_PARTY_REQUEST } from '../reducers/party';
import { LOAD_CONFIRM_REQUEST } from '../reducers/booking';
import wrapper from '../store/configureStore';
import PartySearchForm from '../components/partySearchForm';
import PartyForm from '../components/partyForm';
import PartyPost from '../components/partyPost';
import styled from 'styled-components';

function error(err) {
  Modal.error({
    content: err,
  });
}

const party = () =>{
  const dispatch = useDispatch();
  const { partyPost,addPartyError,addPartyDone,hasmorePosts } = useSelector((state) => state.party);
  const [ btnClicked, setBtnClicked ] = useState("1주일");
  const [ startDate, setStartDate ] = useState(new Date());
  const [ endDate, setEndDate] = useState(new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000));
  const [ searchCode, setSearchCode ] = useState('');
  const [FormOpen, setFormOpen] = useState(false);
  const [ offset, setOffset ] = useState(0);
  const LIMIT = 10;

  useEffect(() => {
    if (addPartyError) {
     return error(addPartyError);
    }if(addPartyDone){
      setFormOpen(false);
    }
  }, [addPartyError,addPartyDone]);

  const toggleFormOpen = () =>{
    setFormOpen((prev)=> !prev);
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

      
  const Search = (start,end,search) =>{
    console.log(start, end);
    setOffset(0);
      //end값이 있는경우
      if(end !== undefined){
          return (
            dispatch({
              type: LOADS_PARTY_REQUEST,
                search,
                start: dayjs(start).format('YYYYMMDD'),
                end: dayjs(end).format('YYYYMMDD')
            })
          )
      }
      //end값 없는경우
      return (
        dispatch({
          type: LOADS_PARTY_REQUEST,
            search,
            start: dayjs(start).format('YYYYMMDD')
        })
      )
    }

    
  const onChangeViewMore = () => {
    const nextOffset = LIMIT + offset;
    setOffset(nextOffset);
    if(endDate !== undefined){
      return (
        dispatch({
          type: VIEWMORE_PARTY_REQUEST,
            search:searchCode,
            start: dayjs(startDate).format('YYYYMMDD'),
            end: dayjs(endDate).format('YYYYMMDD'),
            offset:nextOffset,
        })
      )
  }
  //end값 없는경우
  return (
    dispatch({
      type: VIEWMORE_PARTY_REQUEST,
        search: searchCode,
        start: dayjs(startDate).format('YYYYMMDD'),
        offset:nextOffset,
    })
  )

  }



    return(
        <AppLayout>
           <PartySearchForm 
           toggleFormOpen={toggleFormOpen}
           onChangeSearch={onChangeSearch}
           searchCode={searchCode}
           handleBtnClicked={handleBtnClicked}
           btnClicked={btnClicked}
           startDate={startDate}
           setStartDate={setStartDate}
           endDate={endDate}
           setEndDate={setEndDate}
           Search={Search}
           /> 
           {FormOpen && <PartyForm /> }
            {partyPost.map((v)=>
            <PartyPost key={v.id} party={v}/>
            )}
            {hasmorePosts &&
           <ViewMore>
              <button onClick={onChangeViewMore}>더보기</button>
             </ViewMore>
            }
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
      type: LOADS_PARTY_REQUEST,
    });
    context.store.dispatch({
      type: LOAD_CONFIRM_REQUEST,
    });
    context.store.dispatch({
      type: LOAD_GUIDE_REQUEST,
    });
    context.store.dispatch(END); // 이게있어야 석세스까지 하고 들고옴
    await context.store.sagaTask.toPromise();// 이게있어야 석세스까지 하고 들고옴
  });
  
export default party;



const ViewMore = styled.div`
  text-align:center;
  margin-top:20px;
`