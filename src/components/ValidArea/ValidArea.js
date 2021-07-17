import { Char, Wrapper } from './ValidArea.styles';
const ValidArea = ({ curSentence, typedText }) => {
    return (
        <Wrapper>
            {[...curSentence].map((c, i) => (
                <Char>
                    {c}
                    {c !== typedText[i] && typedText[i] && <div></div>}
                </Char>
            ))}
        </Wrapper>
    );
};

export default ValidArea;
