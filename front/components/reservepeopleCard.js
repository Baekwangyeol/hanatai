import React,{useState,useCallback,useEffect} from 'react';
import { Card,Button ,List ,Row,Col,Input,Modal} from 'antd';
import styled,{ createGlobalStyle } from 'styled-components';
import PeopleRoomtypeForm from './peopleRoomtypeForm';
import ReserveOptionForm from './reserveOptionForm';
import { useDispatch } from 'react-redux';
import { ArrowDownOutlined,ArrowUpOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import HotelTableTd from './hotelTableTd';
import OptionTableTd from './optionTableTd';
import { DELETE_RESERVEROOM_REQUEST,UPDATE_COD_REQUEST,UPDATE_OTHERCODE_REQUEST } from '../reducers/booking';
import Modalmade from './Modal/Modal';

function error(err) {
  Modal.error({
    content: err,
  });
}

const ReservepeopleCard = ({ people }) => {
      dayjs.locale('ko');
     const dispatch = useDispatch();
    const { addReserveroomDone, addReserveoptionDone } = useSelector((state =>state.booking));
    const [updateForm, setUpdateForm] = useState(false);
    const [FormOpend, setFormOpend] = useState(false);
    const [FormOpend2, setFormOpend2] = useState(false);
    const [FormOpend3, setFormOpend3] = useState(true);
    const [ modalOpen, setModalOpen ] = useState(false);
    const [ modalData, setModalData] = useState('');
    const [ codmodalOpen, setCodModalOpen ] = useState(false);
    const [ cod, setCod] = useState('');
    const [ codData ,setCodData]= useState([]);
    const [ existingInputCod,setExistingInputCod ] = useState('');
    const [ otherCodeOpen, setOtherCodeOpen ] = useState(false);
    const [ otherCodeData, setOtherCodeData ] = useState([]);
    const [ otherCode , setOthercode ] = useState('');

       useEffect(() => {
      if (addReserveroomDone) {
        setFormOpend(false);
       }else if(addReserveoptionDone){
        setFormOpend2(false);
       }
     }, [addReserveroomDone,addReserveoptionDone]);
 
     const onTogglePerson = useCallback(() => {
      setFormOpend3((prev) => !prev);
    }, []);
    const closeModal = () => {
      setModalOpen(false);
      setCodModalOpen(false);
      setOtherCodeOpen(false);
  }

    const openDeleteOpen = (item) => {
      setModalOpen(true);
      setModalData(item);
    }
  
    const onRemove = (item) => {
      console.log('peopleid:  '+ people.id + '   itemId :  ' + item);
      dispatch({
        type:DELETE_RESERVEROOM_REQUEST,
        data:{ peopleId: people.id , roomReserve:item }
      })
    }

    const DeleteModal = (item) => {
      onRemove(item);
      setModalOpen(false);
  }

  const openCodOpen = (existingCod, checkindate, id) => {
    setCodModalOpen(true);
    setCodData([existingCod,checkindate,id]);
    const date1  = dayjs(existingCod);
    const date2  = dayjs(checkindate);
    const date3 = date2.diff(date1,'day');
    setExistingInputCod(date3);
  }

  const onUpdateCod = (item,cod) =>{
    let Codplus = parseInt(cod)+1;
    let baba = dayjs(item[1]);
    let d2 = baba.subtract(Codplus,'day');
    dispatch({
      type:UPDATE_COD_REQUEST,
      data:{editcod:d2.startOf('date'), roomReserve:item[2],peopleId:people.id}
    })
  }

  const CodModal = (item)=>{
    onUpdateCod(item,cod)
    setCodModalOpen(false);
  }

  const onChangeCOD = (e) =>{
    setCod(e.target.value);
   }

   const openOtherCodeModal = (othercode,id) =>{
    setOtherCodeOpen(true);
    setOtherCodeData([othercode,id]);
  }


    
    const onToggleHotel = useCallback(() => {
      setFormOpend((prev) => !prev);
    }, []);
    const onToggleOption = useCallback(() => {
      setFormOpend2((prev) => !prev);
    }, []);
  
    const onUpdateOtherCode = (item) =>{
      console.log(item);
      console.log(otherCode);
      dispatch({
        type: UPDATE_OTHERCODE_REQUEST,
        data: { otherCode, roomReserve: item[1], peopleId: people.id}
      })
    }

    const OtherCodeModal = (othercode, id) =>{
      setOtherCodeOpen(false);
      onUpdateOtherCode(othercode,id);
    }

    const onChangeOtherCode =(e) =>{
      setOthercode(e.target.value);
     }

    return(
        <>
        <PersonContainer>
        <PersonTitle>
          <PersonNumber onClick={onTogglePerson}>
          {people.representative+' 외 '+ ((people.adult+people.child+people.infant)-1) + '명,  '+people.adult+'+'+people.child+'c+'+people.infant+'i'}
          </PersonNumber>
        <OpenForm>
        {FormOpend === false 
                  ?(<><RegisterForm onClick={onToggleHotel}>호텔추가<ArrowDownOutlined /></RegisterForm></>) 
                  :(<><RegisterForm onClick={onToggleHotel}>호텔닫기<ArrowUpOutlined /></RegisterForm></>) }
         {FormOpend2 === false 
                  ?(<><RegisterForm onClick={onToggleOption}>옵션추가<ArrowDownOutlined /></RegisterForm></>) 
                  :(<><RegisterForm onClick={onToggleOption}>옵션닫기<ArrowUpOutlined /></RegisterForm></>) }      
        </OpenForm>
        </PersonTitle>       
            { FormOpend && (<PeopleRoomtypeForm people={people}/>)}
            { FormOpend2 && (<ReserveOptionForm people={people}/>)}
        { FormOpend3 && 
       <>
           {people.roomtypeReserves[0] && <TableContainer>
              <TableTitle>호텔내역</TableTitle>
              <TableHotel>
                <thead>
                  <tr>
                  <th>Hotel</th>
                  <th>RoomType</th>
                  <th>NOR</th>
                  <th>CheckIn</th>
                  <th>CheckOut</th>
                  <th>Night</th>
                  <th>COD</th>
                  <th>CODE</th>
                  <th>Edit</th>
                  <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                    { 
                       people.roomtypeReserves[0] && people.roomtypeReserves.map((v)=>
                          <HotelTableTd 
                          key={v.id} 
                          item={v} 
                          onRemove={onRemove} 
                          onDeleteOpen={openDeleteOpen} 
                          onCodOpen={openCodOpen}
                          onOtherCodeOpen={openOtherCodeModal}/>
                        )
                    }
                </tbody>
              </TableHotel>
            </TableContainer>
}
      <Modalmade open={modalOpen} data={modalData} close={closeModal} ok={DeleteModal} header='호텔 예약 삭제'>
            삭제하시겠습니까?
        </Modalmade> 
        <Modalmade open={codmodalOpen} data={codData} close={closeModal} ok={CodModal} header='COD 수정'>
            cod : <input placeholder='cod' onChange={onChangeCOD} /><br/><br/>
            {codData[0] 
            ? 
            <>
            기존 COD 입력값:    {existingInputCod - 1}days  <br/> Date :  {dayjs(codData[0]).format('YY-MM-DD')} <br/>
            </>
            : null}
            계산식 : checkInDate - (COD입력값 + 1) 14일 입력시 15일로 계산합니다. 
        </Modalmade> 

        <Modalmade open={otherCodeOpen} data={otherCodeData} close={closeModal} ok={OtherCodeModal} header='OtherCode 수정'>
            othercode : <input placeholder='othercode' onChange={onChangeOtherCode} /><br/><br/>
            {otherCodeData[0]
            ?
            <>
            기존 코드: {otherCodeData[0]} <br/>
            </>
            : null}
        </Modalmade> 
        {people.reserveOptions[0] && <TableContainer>
              <TableTitle>옵션내역</TableTitle>
              <TableHotel>
                <thead>
                  <tr>
                  <th>Option</th>
                  <th>Detail</th>
                  <th>number</th>
                  <th>date</th>
                  <th>COD</th>
                  <th>Status</th>
                  <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                    { 
                      people.reserveOptions[0]  && people.reserveOptions.map((v)=>
                          <OptionTableTd 
                          key={v.id} 
                          item={v} 
                         />
                        )
                    }
                </tbody>
              </TableHotel>
            </TableContainer>
        }
        </>
    }
      </PersonContainer>
        </>
    )

}

export default ReservepeopleCard;

const PersonContainer = styled.div`
  background-color:#E6DADA;
  padding:8px;
  font-size:16px;
  margin-bottom:10px;
  border:1px solid;
`

const PersonTitle = styled.div`
  width:100%;
  background-color:#E6DADA;
  position: relative; 
  border:1px solid #C1B6B6;
  margin-bottom:5px;
  border-radius:10px;
`;

const PersonNumber =styled.div`
  text-align:center;
  margin-right:50px;
`;

const OpenForm = styled.div`
position:absolute;
right: 0;
bottom:0;
display:flex;
`
const RegisterForm = styled.div`
    cursor:pointer;
  margin-right:8px;
    `

const TableContainer = styled.div`
`

const TableHotel = styled.table`
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


