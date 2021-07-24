import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { randomNumber } from 'src/helpers/random';
import useGetData from './useGetData';

const useGetSentences = () => {
    const { data } = useGetData();
    const [currentIndex, setCurrentIndex] = useState(randomNumber(data.length));

    const [currentSentence, currentAuthor] = data[currentIndex] || ['', ''];

    const [typedSentences, setTypedSentences] = useState([currentSentence]);
    const getNextIndex = () => {
        const randomIndex = randomNumber(data.length);
        const sentenceContent = data[randomIndex][0];
        return typedSentences.includes(sentenceContent)
            ? getNextIndex()
            : randomIndex;
    };
    const [nextIndex, setNextIndex] = useState(getNextIndex);

    const [nextSentence] = data[nextIndex] || ['', ''];

    const typingLength = useSelector((state) => state.typingLength);

    const goToNextSentence = () => {
        setCurrentIndex(nextIndex);
        if (typingLength !== 'paragraph') {
            return setNextIndex(getNextIndex());
        }

        if (nextIndex === data.length) {
            return setNextIndex(0);
        }
        return setNextIndex((preState) => preState + 1);
    };

    useEffect(() => {
        const isFull =
            typedSentences.length === data.length &&
            data.every(([sentence]) =>
                typedSentences.some(
                    ([dataSentence]) => dataSentence === sentence
                )
            );
        if (isFull) return setTypedSentences([data[nextIndex][0]]);
        setTypedSentences((prevState) => [...prevState, data[currentIndex][0]]);
    }, [currentIndex]);

    useEffect(() => {
        if (typingLength === 'paragraph') {
            setCurrentIndex(0);
            setNextIndex(1);
            return;
        }
        setCurrentIndex(randomNumber(data.length));
        setNextIndex(randomNumber(data.length));
    }, [data]);

    return {
        currentSentence,
        currentAuthor,
        nextSentence,
        goToNextSentence,
    };
};

export default useGetSentences;
