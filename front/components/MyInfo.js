import React from 'react';
import { Descriptions, Badge } from 'antd';
import Link from 'next/link';
import { PlusOutlined,UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const ContainerMyPage = styled.div`
    width:100%;
    margin-top:10px;
    display:flex;   
    flex-wrap: wrap;
    padding:10px;
`
const AppMyPage = styled.div`
  display:flex;   
  flex-direction: column;
  margin-right:8px;
  background-color: white;
  padding:20px;
  border: 1px double; 
  flex: auto;
  margin-bottom:8px;
  border-radius:10px;
  :hover{
    border: 5px solid red; 
    cursor:pointer;
  }
`
const AppTitle =styled.div`
   font-size:20px;
`
const AppContent = styled.span`
  font-size:12px;
`

const IconSpace = styled.div`
    float:right;
    font-size:15px;
`

const MyInfo = () => {
  return (
   <>
   <ContainerMyPage>
   <Link href='/profile/personalInfo'>     
      <AppMyPage>
        <AppTitle>개인정보관리 <IconSpace><PlusOutlined /></IconSpace></AppTitle>  
        <AppContent>개인의정보를 수정하거나 탈퇴합니다.</AppContent> <IconSpace><UserOutlined /></IconSpace>
      </AppMyPage>
      </Link>
      <AppMyPage>
        <AppTitle>개인 데이터정리 <IconSpace><PlusOutlined /></IconSpace></AppTitle>  
        <AppContent>본인이 작성한 코드와 정보들을 확인할수 있습니다.</AppContent> <IconSpace><UserOutlined /></IconSpace>
      </AppMyPage>


   </ContainerMyPage>
   </>
);
};

export default MyInfo;