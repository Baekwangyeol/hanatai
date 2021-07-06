import React,{ useState, useCallback,useEffect} from 'react';
import AppLayout from '../components/AppLayout';
import wrapper from '../store/configureStore';
import { useSelector } from 'react-redux';
import { Button,List,Row,Col } from 'antd';
import { END } from 'redux-saga';
import axios from 'axios';
import styled from 'styled-components';
import OptionForm from '../components/optionForm';
import OptionList from '../components/optionList';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import { LOAD_OPTION_REQUEST } from '../reducers/option';


const BookingDiv =styled.div`
  display:inline-block;
  width:100%;
`;

const BookingButton = styled(Button)`
  margin-bottom : 5px;
  float:right;
  margin-right: 5px;
`;

const option = () =>{
    const { optionPost,addOptionDone } = useSelector((state) => state.option);
    const [FormOpend, setFormOpend] = useState(false);

    useEffect(() => {
      if (addOptionDone) {
        setFormOpend(false);
      }
    }, [addOptionDone]);

    const onToggleCompany = useCallback(() => {
      setFormOpend((prev) => !prev);
    }, []);
  
    return(
        <>
         <AppLayout>
         <BookingDiv>
             <BookingButton onClick={onToggleCompany}>{FormOpend === true ? '추가 닫기' : '옵션 추가'}</BookingButton>
            </BookingDiv>   
               { FormOpend && (<OptionForm />)}
                <List
             header={
                  <Row>
                    <Col span={2} offset={10}>
                    OPTION
                    </Col>
                </Row>
                }
        bordered
        dataSource={optionPost}
        renderItem={(item) => (
            <OptionList option={item} />
        )}
      /> 
         </AppLayout>
        </>
    )
};

export const getServerSideProps = wrapper.getServerSideProps(async (context)=>{
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if(context.req && cookie) {
        axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
        type:LOAD_MY_INFO_REQUEST,
    });
    context.store.dispatch({
      type:LOAD_OPTION_REQUEST,
  });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
});
export default option;
