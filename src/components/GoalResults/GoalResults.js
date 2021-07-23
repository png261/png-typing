import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Result, Wrapper } from './GoalResults.styles';

const GoalResults = () => {
    const wrapper = useRef(null);
    const results = useSelector((state) => state.results);

    useEffect(() => {
        wrapper.current.scroll({
            top: wrapper.current.scrollHeight,
            left: 0,
            behavior: 'smooth',
        });
    }, [results]);

    return (
        <Wrapper ref={wrapper}>
            {results.map(({ wpm, cpm, acc }, i) => (
                <Result>
                    <span>{i + 1}</span>
                    wpm:
                    <span>{wpm}</span>
                    cpm:
                    <span>{cpm}</span>
                    acc:
                    <span>{acc}</span>
                </Result>
            ))}
        </Wrapper>
    );
};

export default GoalResults;
