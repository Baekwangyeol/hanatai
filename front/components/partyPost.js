import React,{useState} from 'react';
import PartyCodeForm from './partyCodeForm';
import PartyGuideForm from './partyGuideForm';
import PartyPostcode from './partyPostcode';
import PartyCardTitle from './partyCardTitle';
import PartyAirplane from './partyAirplane';
import styled from 'styled-components';
import PartyShortCodeList from './partyShortCodeList';
import Link from 'next/link';


const partyPost = ({ party }) => {
  const [ contentOpen, setContentOpen] = useState(false);

  const onChangeContent = () =>{
    setContentOpen((prev) => !prev);
  }

    return(
        <>
          <PartyContainer>
            <TitleWrapper backgroundColor={party.UserId !== null}>
            <Link href={`/party/${party.id}`}>
              <MainTitle>
                  <PartyCardTitle party={party} />
              </MainTitle>
              </Link>
              <MiddleDiv onClick={onChangeContent}>
                 미리보기클릭 
              </MiddleDiv>
              <ExtraCode>
                <PartyCodeForm party={party} />
                <PartyGuideForm party={party} />
                <PartyAirplane party={party} />
              </ExtraCode>
            </TitleWrapper>
            {contentOpen && 
            <ContentSection>
            {party.Hanacodes[0] && <CodeTitle>코드</CodeTitle> }
            <CodeSection>
                {party.Hanacodes.map((v)=> 
                <PartyShortCodeList code={v.code} key={v.id}/>
               )}
            </CodeSection>
              <CodeTitle>특이사항</CodeTitle> 
                  선옵션- 
            </ContentSection>
          }
          </PartyContainer>
        </>
    )
} 

export default partyPost;

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
border-radius:10px 10px 10px 10px;
width:100%;
 
`

const CodeSection = styled.div`
  background-color:#DCD3D1;
  border-radius:0 0 10px 10px;
  display:flex;
`

const ContentSection = styled.div`
  background-color:#DCD3D1;
  border-radius:0 0 10px 10px;
`

const ExtraCode = styled.div`
display:inline-block;
float:right;
font-size:14px;
`

const MainTitle = styled.div`
display:inline-block;
:hover{
  cursor: pointer;
   font-size:16px;
 }
`

const MiddleDiv = styled.div`
display:inline-block;
margin-left: 60px;
float:right;
:hover{
  cursor: pointer;
  padding:0 10px 0 0;
 }
`

const CodeTitle =styled.div`
background-color:#93C37F;
text-align:center;
font-size:20px;
`