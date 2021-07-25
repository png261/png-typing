import React from 'react';
import { NextButton, PrevButton, Value, Wrapper } from './ArrowSwitch.styles';

const ArrowSwitch = ({ options, currentOption, value, onChange }) => {
    const index = options.findIndex((option) => option === currentOption);

    const changeValue = (option) => {
        const newIndex = (options.length + index + option) % options.length;
        onChange(options[newIndex]);
    };
    const goToPrev = () => () => changeValue(-1);
    const goToNext = () => () => changeValue(-1);

    return (
        <Wrapper>
            <PrevButton onClick={goToPrev}></PrevButton>
            <Value currentOption={currentOption}>
                {value || currentOption}
            </Value>
            <NextButton onClick={goToNext}></NextButton>
        </Wrapper>
    );
};

export default ArrowSwitch;
