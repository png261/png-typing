import React from 'react';
import { KnobButton, Options, Wrapper } from './KnobSelector.styles';

const KnobSelector = ({ options, onChange, currentOption }) => {
    options = Object.entries(options);
    const index = options.findIndex(
        ([label, value]) => value === currentOption
    );

    const onClick = () => {
        if (!onChange) return;
        const [option, optionValue] = options[(index + 1) % options.length];
        onChange(optionValue);
    };

    return (
        <Wrapper>
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
