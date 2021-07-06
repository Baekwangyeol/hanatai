import React from 'react';
import Slider from "react-slick";
import styled from 'styled-components';
import SlideData from './slideData';


const DateFilterData = [
    {
      id: 1,
      value: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ahri_28.jpg",
      schdule: "행사중",
      name:"이부장"
    },
    {
      id: 2,
      value: "https://mblogthumb-phinf.pstatic.net/MjAyMDAzMDdfMTM5/MDAxNTgzNTc0NzQ5MDMz.aTrlUJa21MzI9F5KVPsN2TW0-MUOUb4GyxFlVgODsR0g.kZ-dmLY9tmvt_Emk2wNaBPs4oh-ClhUt2CXTOxg0awIg.PNG.louis0826/%EB%AF%B8%EC%8A%A4%ED%8F%AC%EC%B8%883.PNG?type=w800",
      schdule: "행사중",
      name:"최부장"
    },
    {
      id: 3,
      value: "https://blog.kakaocdn.net/dn/b3Lzb3/btqGbaOO4u2/KORyTe93DxXRaIjVf9VOJk/img.jpg",
      schdule: "휴가",
      name:"칼부장"
    },
    {
      id: 4,
      value: "https://blog.kakaocdn.net/dn/Bbmnb/btqLWINe814/kCnJyWIHpiH9KPKd73rRt1/img.jpg",
      schdule: "휴무",
      name:"다부장"
    },
    {
      id: 5,
      value: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Kaisa_14.jpg",
      schdule: "행사중",
      name:"캘부장"
    },
    {
      id: 6,
      value: "https://pbs.twimg.com/media/EveAaYcXMAcdFHX?format=jpg&name=4096x4096",
      schdule: "행사중",
      name:"대부장"
    },
  ];
  

const slideGuide = () =>{
    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 3,
        speed: 500
      };

     

    return(
        <>
        <h2>Guide Info</h2>
        <Wrap {...settings}>
            {DateFilterData.map((v) => 
            <SlideData data={v} key={v.id}/>
            )}
        </Wrap>
        </>
    )
}


export default slideGuide;

const Wrap = styled(Slider)`
    margin: 0 auto;
    padding: 0px 40px 40px 40px;
     width: 100%;
     display:flex;
     align-items:center;
     justify-content:center;
     .slick-next:before, .slick-prev:before {
        color: #000;
    }
  
  `