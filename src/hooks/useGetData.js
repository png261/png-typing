import { useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ALL_DATA from 'src/constants/allData';
import { randomNumber } from 'src/helpers/random';

const useGetData = () => {
    const getSentences = () => {
        const DATA = ALL_DATA[typingLength][language];
        if (typingLength === 'paragraph') {
            return DATA[randomNumber(DATA.length)];
        }
        return DATA;
    };
    const language = useSelector((state) => state.language);
    const typingLength = useSelector((state) => state.typingLength);
    const [data, setData] = useState(getSentences);

    useLayoutEffect(() => {
        setData(getSentences);
    }, [language, typingLength]);

    return { data };
};

export default useGetData;
