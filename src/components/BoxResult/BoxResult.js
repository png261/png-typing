import React from 'react';
import { Wrapper } from './BoxResult.style';

const BoxResult = ({ label, value, isHighLight, textLeft }) => {
    return (
        <Wrapper isHighLight={isHighLight} textLeft={textLeft}>
            <label>{label}</label>
            <span>{value}</span>
        </Wrapper>
    );
};

export default BoxResult;
