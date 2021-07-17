import { useEffect, useState } from 'react';
import { getRandomFromData } from 'src/helpers/random';

const RandomSentence = ({ data, intervals }) => {
    const [sentence, setSentence] = useState(getRandomFromData(data));

    useEffect(() => {
        const randomInterval = setInterval(
            () => setSentence(getRandomFromData(data)),
            intervals
        );
        return () => {
            clearInterval(randomInterval);
        };
    }, []);
    return <p>{sentence}</p>;
};

export default RandomSentence;
