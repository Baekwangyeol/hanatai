import React,{ useState,useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch,useSelector } from 'react-redux';
import { LOAD_AIRNUMBER_REQUEST } from '../reducers/airplane';
import { ADD_AIRNUMBER_REQUEST } from '../reducers/party';
import Modalmade from './Modal/Modal';

const partyAirplane = ({ party }) =>{
    const dispatch = useDispatch();
    const { airnumberPost } = useSelector((state) => state.airplane);
    const { addAirnumberDone } = useSelector((state) => state.party);
    const [ airModal, setAirModal ] = useState(false);
    const [ airnumberCode, setAirnumberCode ] = useState();
    const [ selectOpen, setSelectOpen ] = useState(false);
    const [ numberSelect, setNumberSelect] = useState("");

    useEffect(() => {
      if(addAirnumberDone){
        setAirModal(false);
      }
    }, [addAirnumberDone])

        
    const ArrayPaturn = new Set(party.Hanacodes.map((v) => v.code.match(/\d[a-zA-Z]+/g).toString().slice(1).toUpperCase()));

    const ArrayPa = [...ArrayPaturn];
 
    
    const OpenModal = () =>{
        setAirModal((prev) => !prev);
        console.log(ArrayPaturn);
        console.log(ArrayPa);
    }
    const closeModal =() =>{
        setAirModal(false);
        setAirnumberCode();
        setSelectOpen(false);
    }
    const onChangeAirplane = (e) =>{
        let codeSelect = e.target.value;
        if(codeSelect === ""){
            setAirnumberCode();
            setSelectOpen(false);
            return null;
        }
        dispatch({
            type: LOAD_AIRNUMBER_REQUEST,
            code: codeSelect,
        })
        setSelectOpen(true);
        setAirnumberCode();
    }

    const confirmModal = () => {
        
        console.log(numberSelect);
        dispatch({
            type: ADD_AIRNUMBER_REQUEST,
            data: { airNumberId: numberSelect, partyId: party.id }
        })
    }

    const onChangeNumber = (e) =>{
        let checkId = parseInt(e.target.value);
        setNumberSelect(e.target.value);
        let checkNumber = airnumberPost.find((v) => v.id === checkId); 
        setAirnumberCode(checkNumber);
    }

    return (
        <>
            <AirplaneForm onClick={OpenModal}>
                항공
            </AirplaneForm>
            <Modalmade open={airModal} close={closeModal} ok={confirmModal} header='항공 추가'>
            <ContainerWrapper>
            <select name="pets" onChange={onChangeAirplane}>
                <option value="">--AIRPLANE--</option>
                { ArrayPa.map((v)=> <option value={v}>{v}</option>)}
             </select>
             {selectOpen && (<select name="pets" onChange={onChangeNumber} value={numberSelect}>
                <option value="">--AIRPLANE--</option>
                { airnumberPost.map((v)=> <option value={v.id}>{v.number}</option>)}
             </select>)}
            {airnumberCode && <div>{airnumberCode.departureSpace} : {airnumberCode.departureTime} ~ {airnumberCode.arriveSpace} : {airnumberCode.arriveTime}  </div>}
            </ContainerWrapper>
            </Modalmade>
        </>
    )
}

export default partyAirplane;

const AirplaneForm = styled.div`
    display:inline-block;
    cursor: pointer;
    margin-left:5px;
`

const ContainerWrapper = styled.div`
    display:flex;
`
