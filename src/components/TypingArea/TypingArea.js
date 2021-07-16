import React from 'react';
import ValidArea from '../ValidArea/ValidArea';
import { Next, Wrapper } from './TypingArea.styles';

const TypingArea = ({
    curSentence,
    typedText,
    nexSentence,
    onChange,
    onKeyDown,
}) => {
    return (
        <Wrapper>
            <ValidArea curSentence={curSentence} typedText={typedText} />
            <input
                type="text"
                autoComplete="off"
                placeholder="Typing works like above text and enter(space)"
                onChange={onChange}
                value={typedText}
                onKeyDown={onKeyDown}
            />
            {/* goal-bar */}
            <Next>
                <span>NEXT</span>
                {nexSentence}
            </Next>
        </Wrapper>
    );
};

export default TypingArea;
