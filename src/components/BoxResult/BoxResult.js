import React from 'react';
import { Wrapper } from './BoxResult.style';

const BoxResult = ({ label, value, className }) => {
    return (
        <Wrapper className={className}>
            <label>{label}</label>
            <span>{value}</span>
        </Wrapper>
    );
};

export default BoxResult;
