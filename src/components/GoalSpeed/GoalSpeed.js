import React from 'react';
import { useSelector } from 'react-redux';
import BoxResult from '../BoxResult/BoxResult';

const GoalSpeed = () => {
    const allResult = useSelector((state) => state.results.all);
    const goalCPM =
        allResult.length === 0
            ? 0
            : Math.max(...(allResult.map(({ cpm }) => cpm) || 0));

    return <BoxResult label="Goal speed" value={goalCPM} textLeft={true} />;
};

export default GoalSpeed;
