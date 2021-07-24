import React from 'react';
import { useSelector } from 'react-redux';
import BoxResult from '../BoxResult/BoxResult';

const Accuracy = () => {
    const ACC = useSelector((state) => state.realTimeInfo.acc);

    return <BoxResult label="Accuracy" value={ACC} />;
};

export default Accuracy;
