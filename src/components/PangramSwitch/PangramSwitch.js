import React from 'react';
import { Switch, Wrapper } from './PangramSwitch.styles';

const PangramSwitch = ({ label, onChange, value }) => {
    return (
        <Wrapper onClick={onChange}>
            <label>{label}</label>
            <Switch active={value} />
        </Wrapper>
    );
};

export default PangramSwitch;
