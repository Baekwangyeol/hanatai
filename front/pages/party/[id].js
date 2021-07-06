import React,{useState,useCallback,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { END } from 'redux-saga';
import { ArrowUpOutlined,ArrowDownOutlined } from '@ant-design/icons';
import axios from 'axios';
import wrapper from '../../store/configureStore';
import AppLayout from '../../components/AppLayout';
import PartyCodeForm from '../../components/partyCodeForm';
import PartyGuideForm from '../../components/partyGuideForm';
import PartyCardTitle from '../../components/partyCardTitle';
import PartyAirplane from '../../components/partyAirplane';
import styled from 'styled-components';
import PartyCodeList from '../../components/partyCodeList';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import { LOAD_PARTY_REQUEST } from '../../reducers/party';


const Party = () =>{
  const router = useRouter();
  const { id } = router.query;
  const { singleParty } = useSelector((state => state.party));
  const [ adult , setAdult ] = useState(0);
  const [ child, setChild ] = useState(0);
  const [ infant, setInfant ] = useState(0);
  const Addpeople = (ad,ch,inf) => {
    setAdult((prev) => prev + ad);
    setChild((prev) => prev + ch);
    setInfant((prev) => prev + inf);
  } 
  
  useEffect(() => {
    if(singleParty){
      setAdult(0);
      setChild(0);
      setInfant(0);
       singleParty.Hanacodes.map((v) =>
      v.reservecodes.map((b)=>
        b.reservePeople.map((n)=>
          Addpeople(n.adult,n.child,n.infant)
        )
    )
);
    }
  }, [singleParty]);

    return (
        <>
           <AppLayout>
           <PartyContainer>
           {singleParty && <TitleWrapper backgroundColor={singleParty.UserId !== null}>
              <MainTitle>
              <PartyCardTitle party={singleParty}/>
              인원 : {adult} +{child}c + {infant}i
              </MainTitle>
              <ExtraCode>
               <PartyCodeForm party={singleParty} />
                <PartyGuideForm party={singleParty} />
                <PartyAirplane party={singleParty} />
              </ExtraCode>
            </TitleWrapper>}
            <ContentSection>
            {singleParty && (singleParty.Hanacodes[0] && <CodeTitle>코드</CodeTitle>) }
            <CodeSection>
                {/* {singleParty && singleParty.Hanacodes.map((v)=> 
                <PartyCodeList code={v} key={v.id}/>
               )} */}
                  <TableContainer>
              <TableTitle>옵션내역</TableTitle>
              <TableHotel>
                <thead>
                  <tr>
                  <th>Hanacode</th>
                  <th>Reservecode</th>
                  <th>People</th>
                  <th>Hotel</th>
                  <th>Content</th>
                  <th>Status</th>
                  <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                {singleParty && singleParty.Hanacodes.map((v,index)=>{
                  return v.reservecodes.map((obj, index2) =>{
                    return (
                      <tr key={index} >
                          <PartyCodeList 
                                key={index2} 
                                idx={index2}
                                reservecode={obj}
                                hanacode={v.code}
                                rows={v.reservecodes.length}
                                />
                      </tr>
                    )
                  })
                } 
               )}
                </tbody>
              </TableHotel>
            </TableContainer>
            </CodeSection>
              <CodeTitle>특이사항</CodeTitle> 
                  선옵션- 
            </ContentSection>
          </PartyContainer>
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
        type: LOAD_PARTY_REQUEST,
        data: context.params.id,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
});

export default Party;


const PartyContainer = styled.div`
  margin-bottom:8px;
  width:100%;
  border:1px solid;
  border-radius:10px;
`

const TitleWrapper = styled.div` 
background-color: ${props => {
  if (props.backgroundColor) return '#70A67B';
  else return '#E45866';
}};
height:50px;
padding:12px 12px;
font-size:14px;
border-radius:10px 10px 0 0;
width:100%;
`

const CodeSection = styled.div`
  background-color:#DCD3D1;
  border-radius:0 0 10px 10px;
  display:block;
`

const ContentSection = styled.div`
  background-color:#DCD3D1;
  border-radius:0 0 10px 10px;
`

const ExtraCode = styled.div`
float:right;
font-size:14px;
`

const MainTitle = styled.div`
display:inline-block;
`

const CodeTitle =styled.div`
background-color:#93C37F;
text-align:center;
font-size:20px;
`
const TableContainer = styled.div`
`

const TableHotel = styled.table`
width: 100%;
  th{
    background-color: #4CAF50;
    color: white;
    border: 1px solid;
    padding: 8px;
  }
  tr, td {
    border: 1px solid;
    text-align: center;
  }
  
`

const TableTitle = styled.div`
  text-align:center;
  font-size:20px; 
`

