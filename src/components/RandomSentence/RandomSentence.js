import { useEffect, useState } from 'react';
import { getRandomFromData } from 'src/helpers/random';
import React from 'react';
import NOTICES from 'src/constants/notices';

const RandomSentence = () => {
    const [sentence, setSentence] = useState(getRandomFromData(NOTICES));

    useEffect(() => {
        const randomInterval = setInterval(
            () => setSentence(getRandomFromData(NOTICES)),
            5000
        );
        return () => {
            clearInterval(randomInterval);
        };
    }, []);
    return <p>{sentence}</p>;
};

export default RandomSentence;
