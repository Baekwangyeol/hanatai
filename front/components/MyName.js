import React from 'react';
import { useSelector } from 'react-redux';

const MyName = () => {
    const { me, logOutLoading } = useSelector((state) => state.user);
  return (
    <>
    {me.name}님 어서오세요
    </>
  );
};

export default MyName;