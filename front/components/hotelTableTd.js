import React,{useState} from 'react';
import dayjs from 'dayjs';
import {useDispatch} from 'react-redux';
import { BiEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import styled from 'styled-components';

const hotelTableTd = ({ item, onDeleteOpen, onCodOpen,onOtherCodeOpen })=>{

    const DeleteModal = (item) => {
        onDeleteOpen(item);
    }

    const CodEditModal = (cod,checkindate,id) => {
        onCodOpen(cod,checkindate,id);
    }
    
    const OthercodeEditModal = (othercode,id)=>{
        onOtherCodeOpen(othercode,id);
    }

    // const CODModal = ()=>{
    //     let Codplus =parseInt(Cod)+1;
    //     let baba = dayjs(item.checkInDate);
    //     let d2 = baba.subtract(Codplus,'day');
    //     console.log(d2.format('YYYY-MM-DD'));
    //     setCodModalOpen(false);
    // }

    return(
        <>
        <tr>
            <td>{item.Roomtype.Hotel.name}</td>
            <td>{item.Roomtype.name}</td>
            <td>{item.numberOfRoom}R       {item.numberOfExtrabed}EB       {item.numberOfExtraperson}EP</td>
            <td>{dayjs(item.checkInDate).format('YYYY-MM-DD')}</td>
            <td>{dayjs(item.checkOutDate).format('YYYY-MM-DD')}</td>
            <td>{item.night}박</td>
            <td>{item.COD 
            ? 
            <>
            <div onClick={()=>CodEditModal(item.COD, item.checkInDate,item.id)} >
            {dayjs(item.COD).format('YY-MM-DD')} 
            </div>
            </>
            : 
            <>
            <EditIcon onClick={()=>CodEditModal(item.COD, item.checkInDate,item.id)} />
            </>} </td>
            <td>{item.othercode 
            ? 
            <>
            <div onClick={()=>OthercodeEditModal(item.othercode,item.id)}>
            {item.othercode} 
            </div>
            </>
            : 
            <>
            <EditIcon onClick={()=>OthercodeEditModal(item.othercode,item.id)} />
            </>}</td>
            <td><EditIcon/></td>
            <td><DeleteIcon onClick={()=>DeleteModal(item.id)} /></td>
        </tr>
        </>
    )
}

export default hotelTableTd;


const DeleteIcon = styled(MdDeleteForever)`
     font-size:24px;
     cursor: pointer;
     :hover{
         font-size:30px;
     }
`

const EditIcon = styled(BiEdit)`
     font-size:24px;
     cursor: pointer;
     :hover{
         font-size:30px;
     }
`
