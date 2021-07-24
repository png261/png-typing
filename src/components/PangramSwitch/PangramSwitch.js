import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateLanguage } from 'src/slices/language';
import { updateTypingLength } from 'src/slices/typingLength';
import { Switch, Wrapper } from './PangramSwitch.styles';

const PangramSwitch = () => {
    const dispatch = useDispatch();
    const language = useSelector((state) => state.language);
    const turnOn = () => {
        dispatch(updateLanguage('pangram'));
        dispatch(updateTypingLength('sentences'));
    };
    const turnOff = () => {
        dispatch(updateLanguage('ens'));
    };

    return (
        <Wrapper onClick={language === 'pangram' ? turnOff : turnOn}>
            <label>Pangram</label>
            <Switch active={language === 'pangram'} />
        </Wrapper>
    );
};

export default PangramSwitch;
