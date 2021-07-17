import ValidArea from '../ValidArea/ValidArea';
import { GoalBar, Next, Wrapper } from './TypingArea.styles';

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
                onPaste={(e) => e.preventDefault()}
                placeholder="Typing works like above text and enter(space)"
                onChange={onChange}
                value={typedText}
                onKeyDown={onKeyDown}
            />
            <GoalBar value={12} />
            <Next>
                <span>NEXT</span>
                {nexSentence}
            </Next>
        </Wrapper>
    );
};

export default TypingArea;
