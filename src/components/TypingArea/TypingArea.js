import { useEffect, useRef } from 'react';
import ValidArea from '../ValidArea/ValidArea';
import { GoalBar, Next, Wrapper } from './TypingArea.styles';

const TypingArea = ({
    currentSentence,
    typedText,
    nextSentence,
    onChange,
    onKeyDown,
    CPM,
}) => {
    const input = useRef();
    useEffect(() => {
        input.current.focus();
    }, []);

    return (
        <Wrapper>
            <ValidArea curSentence={currentSentence} typedText={typedText} />
            <input
                ref={input}
                type="text"
                autoComplete="off"
                onPaste={(e) => e.preventDefault()}
                placeholder="Typing works like above text and enter(space)"
                value={typedText}
                onChange={onChange}
                onKeyDown={onKeyDown}
            />
            <GoalBar CPM={CPM} />
            <Next>
                <span>NEXT</span>
                {nextSentence}
            </Next>
        </Wrapper>
    );
};

export default TypingArea;
