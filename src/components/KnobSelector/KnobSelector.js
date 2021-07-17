import React, { useState } from 'react';
import { KnobButton, Options, Wrapper } from './KnobSelector.styles';

const KnobSelector = ({ className, options, onChange, currentOption }) => {
    options = Object.entries(options);
    const index = options.findIndex(
        ([label, value]) => value === currentOption
    );

    const onClick = () => {
        if (!onChange) return;
        onChange(options[(index + 1) % options.length][1]);
    };

    return (
        <Wrapper className={className}>
            <KnobButton>
                <button
                    onClick={onClick}
                    className={index ? 'active' : ''}
                ></button>
            </KnobButton>
            <Options>
                {options.map(([label, value]) => (
                    <span>{label}</span>
                ))}
            </Options>
        </Wrapper>
    );
};

export default KnobSelector;
