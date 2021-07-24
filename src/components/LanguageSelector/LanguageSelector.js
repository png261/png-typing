import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateLanguage } from 'src/slices/language';
import KnobSelector from '../KnobSelector/KnobSelector';

const LanguageSelector = () => {
    const dispatch = useDispatch();
    const language = useSelector((state) => state.language);
    const setLanguage = (lang) => dispatch(updateLanguage(lang));
    return (
        <KnobSelector
            options={{ English: 'ens', Vietnamese: 'vn' }}
            onChange={setLanguage}
            currentOption={language}
        />
    );
};

export default LanguageSelector;
