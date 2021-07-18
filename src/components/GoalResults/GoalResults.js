import React from 'react';
import { Result, Wrapper } from './GoalResults.styles';

const GoalResults = ({ results }) => {
    return (
        <Wrapper>
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
