import React from 'react';

const partyInHotelList = (props) =>{
    const {idx, hotel, People,rows } = props;

    return (
        <>
          {idx === 0 ? (
                <td rowSpan={rows} style={{ padding : 8, }}>{People.adult}+{People.child}c+{People.infant}i </td>
            ) : null}
            <td style={{ padding : 8, }}>
            {hotel.Roomtype.Hotel.name}/{hotel.Roomtype.name}/{hotel.numberOfRoom}R{hotel.numberOfExtrabed}EB{hotel.numberOfExtraperson}EP<br/>
            </td>
          
        </>
    )
}

export default partyInHotelList;

