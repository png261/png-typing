import React from 'react';
import { useSelector } from 'react-redux';
import BoxResult from '../BoxResult/BoxResult';

const Speed = () => {
    const CPM = useSelector((state) => state.realTimeInfo.cpm);

    return <BoxResult label="Speed" value={CPM} isHighLight={CPM > 350} />;
};

export default Speed;
