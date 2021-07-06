import React,{ useCallback,useState,useEffect } from 'react';
import { Checkbox } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_GUIDE_REQUEST } from '../reducers/party';
import styled from 'styled-components';
import Modalmade from './Modal/Modal';

const StatusCursor = styled.span`
    cursor: pointer;
    margin-left:5px;
    margin-right:5px;
`;

const partyGuideForm = ({ party }) => {
    const dispatch = useDispatch();
    const { guidePost } = useSelector((state) => state.user);
    const { addGuideDone } = useSelector((state)=> state.party);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [guide, setGuide] = useState(party.UserId === null ? '' : party.UserId);

    useEffect(() => {
     if(addGuideDone){
      setIsModalVisible(false);
     }
    }, [addGuideDone])
 
  const showModal = () => {
    setIsModalVisible((prev) => !prev);
  };

  const closeModal = () =>{
    setGuide(party.UserId === null ? '' : party.UserId);
    setIsModalVisible(false);
}

  const onChangeGuide = useCallback((e)=>{
    if(e.target.checked){
      setGuide(e.target.value);
    }else{
      //체크해제
      setGuide('');
    }
  }, [guide]);

  const confirmModal = useCallback(() => {
    console.log(guide);
      dispatch({
        type: ADD_GUIDE_REQUEST,
       data: { guide, partyId: party.id },
       })
  }, [guide]);


    return (
        <>
        <StatusCursor onClick={showModal}>
          가이드
        </StatusCursor>
        |
        <Modalmade open={isModalVisible} close={closeModal} ok={confirmModal} header='항공 추가'>
            <Checkbox checked={guide === '' ? true : false} onChange={onChangeGuide} value="">미정</Checkbox><br/>
            {guidePost.map((v) =>
              <>
                <Checkbox checked={guide === v.id ? true : false} onChange={onChangeGuide} value={v.id} key={v.id}>{v.name}</Checkbox><br/>
              </>
           )}    
        </Modalmade>
        </>
    )

}

export default partyGuideForm;