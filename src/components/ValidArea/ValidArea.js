import { Char } from './ValidArea.styles';
const ValidArea = ({ curSentence, typedText }) => {
    return (
        <div>
            {[...curSentence].map((c, i) => (
                <Char>
                    {c}
                    {c !== typedText[i] && typedText[i] && <div></div>}
                </Char>
            ))}
        </div>
    );
};

export default ValidArea;
