import React,{ useCallback , useState, useEffect} from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { Descriptions, Table ,Button} from 'antd';
import PropTypes from 'prop-types';
import CompanyOptionForm from './companyOptionForm';
import CompanyOptionDetail from './companyOptionDetail';
import styled,{ createGlobalStyle } from 'styled-components';

const Global = createGlobalStyle`
    tr.ant-table-expanded-row .ant-descriptions-view table{
        width:100%;
    }
`;

const BookingDiv =styled.div`
  display:inline-block;
  width:100%;
`;

const BookingButton = styled(Button)`
  margin-bottom : 5px;
  float:right;
  margin-right: 5px;
`;

const column = [
  { title: 'Name',
    dataIndex: 'name',
    key: 'id',
    render: text => <a>{text}</a> },
  { title: 'Position', dataIndex: 'position', key: 'id' },
  { title: 'Work', dataIndex: 'work', key: 'id' },
];

const companyContent = ({ company }) => {
  const  { addCompanyOptionDone  } = useSelector((state)=> state.company);
  const [CompanyFormOpend, setCompanyFormOpend] = useState(false);

  const onToggleCompany = useCallback (()=>{
    setCompanyFormOpend((prev)=> !prev);
  },[])

  
  useEffect(() => {
    if (addCompanyOptionDone) {
      setCompanyFormOpend(false);
    }
  }, [addCompanyOptionDone]);


  return (
    <>
      <Global />
      <Descriptions>
        <Descriptions.Item label="CompanyName" span={3}>{company.company}</Descriptions.Item>
        <Descriptions.Item label="Country" span={1}>{company.Country.country}</Descriptions.Item>
        <Descriptions.Item label="Region" span={2}>{company.Region.region}</Descriptions.Item>
        <Descriptions.Item label="Business">{company.business}</Descriptions.Item>
        <Descriptions.Item label="Address" span={2}>
          {company.address}
        </Descriptions.Item>
        <BookingDiv>
             <BookingButton onClick={onToggleCompany}>{CompanyFormOpend === true ? '추가 닫기' : 'Net price추가'}</BookingButton>
            </BookingDiv>  
      </Descriptions>
       {company.Contacts[0] 
       ? <h3 style={{marginLeft:'10px'}}>Staff</h3>
       : null} 
      {company.Contacts[0] 
       ?  <Table
       bordered
       className="components-table-demo-nested"
       columns={column}
       dataSource={company.Contacts}
       pagination={false}
       rowKey={(record) => record.id}
       />
       : null} 
       { CompanyFormOpend && (<CompanyOptionForm company={company}/>)}
       <br/><br/>
      {company.Details.map((v)=> 
          <CompanyOptionDetail key={v.id} detail={v} />
      )}

    </>
  );
};


export default companyContent;