import React from 'react';
import { Switch, Wrapper } from './PangramSwitch.styles';

const PangramSwitch = ({ label, onActive, onOff, isActive }) => {
    return (
        <Wrapper onClick={isActive ? onOff : onActive}>
            <label>{label}</label>
            <Switch active={isActive} />
        </Wrapper>
    );
};

export default PangramSwitch;
