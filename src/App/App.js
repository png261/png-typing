import { useEffect, useState } from 'react';
import ArrowSwitch from 'src/components/ArrowSwitch/ArrowSwitch';
import KnobSelector from 'src/components/KnobSelector/KnobSelector';
import RandomSentence from 'src/components/RandomSentence/RandomSentence';
import Switch from 'src/components/Switch/Switch';
import TypingArea from 'src/components/TypingArea/TypingArea';
import DATA from 'src/constants/data';
import { getRandomFromData } from 'src/helpers/random';
import useClock from 'src/hooks/useClock';
import {
    InfoTable,
    Wrapper,
    OptionTyping,
    Author,
    Result,
    BoxResult,
} from './App.styles';

const App = () => {
    const [languages, setLanguages] = useState('ens');
    const [sentences, setSentences] = useState(DATA[languages]);
    const randomSentence = () => getRandomFromData(sentences);

    const [curSentence, setCurSentence] = useState(randomSentence);
    const [nexSentence, setNexSentence] = useState(randomSentence);
    const [typedText, setTypedText] = useState('');
    const [typedSentences, setTypedSentences] = useState([curSentence]);
    const [typingMode, setTypingMode] = useState('time');
    const [typingModeValue, setTypingModeValue] = useState({
        time: 5,
        minute: '01:00',
    });
    const typingModeOptions = {
        time: [5, 10, 15, 20, '∞'],
        minute: [
            ...[...new Array(10).keys()].map(
                (t) => `${String(t + 1).padStart(2, '0')}:00`
            ),
            '∞',
        ],
    };

    useEffect(() => {
        setSentences(DATA[languages]);
        return () => {
            setSentences([]);
        };
    }, [languages]);

    useEffect(() => {
        setCurSentence(randomSentence());
        setNexSentence(randomSentence());
        return () => {
            setTypedText('');
        };
    }, [sentences]);

    const updateTypedText = (e) => {
        setTypedText(e.target.value);
    };

    const nextSentence = () => {
        setCurSentence(nexSentence);
        setTypedText('');
        setTypedSentences((state) => [state, curSentence]);

        let next = randomSentence();
        while (typedSentences.includes(next)) {
            next = randomSentence();
        }
        setNexSentence(next);
    };

    const handelSubmit = (e) => {
        if (e.key !== 'Enter') return;
        const isWrongTooMuch =
            [...typedText].filter((c, i) => curSentence[0][i] !== c).length > 5;
        const isDone = typedText.length >= curSentence[0].length;
        if (!isDone || isWrongTooMuch) return;

        nextSentence();
    };

    const changeTypingModeValue = (value) => {
        setTypingModeValue((state) => ({
            ...state,
            [typingMode]: value,
        }));
    };

    const time = useClock();

    return (
        <Wrapper>
            <main>
                <InfoTable>
                    <RandomSentence data={sentences} intervals={5000} />
                    <notice>
                        <span>{time}</span>
                    </notice>
                    <KnobSelector
                        className="languages-options"
                        options={{ English: 'ens', Native: 'vn' }}
                        onChange={setLanguages}
                        currentOption={languages}
                    />
                    <KnobSelector
                        className="sentences-options"
                        options={{ Sentences: 'ens', Paragraph: 'vn' }}
                        currentOption={1}
                    />
                    <Result className="result"></Result>
                    <OptionTyping className="typing-options">
                        <Switch
                            options={{ Time: 'time', Minute: 'minute' }}
                            currentOption={typingMode}
                            onChange={setTypingMode}
                        />
                        <ArrowSwitch
                            options={typingModeOptions[typingMode]}
                            currentOption={typingModeValue[typingMode]}
                            onChange={changeTypingModeValue}
                        />
                    </OptionTyping>
                    <BoxResult>
                        <label>Goal speed</label>
                        <span>0</span>
                    </BoxResult>
                    <BoxResult>
                        <label>Speed</label>
                        <span>0</span>
                    </BoxResult>
                    <BoxResult>
                        <label>Accuracy</label>
                        <span>0</span>
                    </BoxResult>
                    <BoxResult>
                        <label>Count</label>
                        <span>0</span>
                    </BoxResult>
                    <Author className="author">{curSentence[1]}</Author>
                    {/* Notice */}
                    {/* KeyBoardEffect */}
                </InfoTable>
                <TypingArea
                    curSentence={curSentence[0]}
                    nexSentence={nexSentence[0]}
                    typedText={typedText}
                    onChange={updateTypedText}
                    onKeyDown={handelSubmit}
                />
            </main>
        </Wrapper>
    );
};

export default App;
