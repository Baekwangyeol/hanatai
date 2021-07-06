import React from 'react';
import { Card } from 'antd';
import Link from 'next/link';

const hotelCard = ({ hotel }) => {
  return(
    <>
     <Link href={`/hotel/${hotel.id}`}>
     <a>
     <Card
       hoverable
       style={{ width: 240,display: 'inline-block' }}
       cover={<img src={`http://localhost:3065/${hotel.src}`} alt={hotel.src} />}
  >
    <Card.Meta title={hotel.name} description={hotel.Region.region} />
   
  </Card>
  </a>
  </Link>
  </>  
)
}

export default hotelCard;