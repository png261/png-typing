import React from 'react';
import { Switch, Wrapper } from './PangramSwitch.styles';

const PangramSwitch = ({ label, onActive, value }) => {
    return (
        <Wrapper onClick={onActive}>
            <label>{label}</label>
            <Switch active={value} />
        </Wrapper>
    );
};

export default PangramSwitch;
