import React from 'react';
import { NextButton, PrevButton, Value, Wrapper } from './ArrowSwitch.styles';

const ArrowSwitch = ({ options, currentOption, value, onChange }) => {
    const index = options.findIndex((option) => option === currentOption);

    const changeValue = (option) => {
        let newIndex = (options.length + index + option) % options.length;
        onChange(options[newIndex]);
    };
    return (
        <Wrapper>
            <PrevButton onClick={() => changeValue(-1)}></PrevButton>
            <Value currentOption={currentOption}>
                {value || currentOption}
            </Value>
            <NextButton onClick={() => changeValue(1)}></NextButton>
        </Wrapper>
    );
};

export default ArrowSwitch;
