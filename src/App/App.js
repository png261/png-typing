import { useEffect, useState } from 'react';
import ArrowSwitch from 'src/components/ArrowSwitch/ArrowSwitch';
import BoxResult from 'src/components/BoxResult/BoxResult';
import Clock from 'src/components/Clock/Clock';
import GoalResults from 'src/components/GoalResults/GoalResults';
import KnobSelector from 'src/components/KnobSelector/KnobSelector';
import RandomSentence from 'src/components/RandomSentence/RandomSentence';
import Switch from 'src/components/Switch/Switch';
import TypingArea from 'src/components/TypingArea/TypingArea';
import TypingEffect from 'src/components/TypingEffect/TypingEffect';
import NOTICES from 'src/constants/notices';
import SENTENCES from 'src/constants/sentences';
import { getRandomFromData } from 'src/helpers/random';
import { Author, InfoTable, Notice, OptionTyping, Wrapper } from './App.styles';

const App = () => {
    const [languages, setLanguages] = useState('ens');
    const [sentences, setSentences] = useState(SENTENCES[languages]);
    const randomSentence = () => getRandomFromData(sentences);
    useEffect(() => {
        setSentences(SENTENCES[languages]);
    }, [languages]);

    const [curSentence, setCurSentence] = useState(randomSentence);
    const [nexSentence, setNexSentence] = useState(randomSentence);
    useEffect(() => {
        setCurSentence(randomSentence());
        setNexSentence(randomSentence());
        return reset;
    }, [sentences]);

    const [typedText, setTypedText] = useState('');
    const [typedSentences, setTypedSentences] = useState([]);

    const [typingMode, setTypingMode] = useState('times');
    const [typingModeValue, setTypingModeValue] = useState({
        times: 5,
        minute: '01:00',
    });
    const typingModeOptions = {
        times: [5, 10, 15, 20, '∞'],
        minute: [
            ...[...new Array(10).keys()].map(
                (t) => `${String(t + 1).padStart(2, '0')}:00`
            ),
            '∞',
        ],
    };

    const [accuracy, setAccuracy] = useState(0);
    const getAccuracy = () =>
        Math.round((1 - countWrong() / typedText.length || 0) * 100);

    useEffect(() => {
        setAccuracy(getAccuracy());
    }, [typedText]);

    const [countTimes, setCountTime] = useState(0);
    const [goalResults, setGoalResults] = useState([]);

    const countWrong = () =>
        [...typedText].filter((c, i) => curSentence[0][i] !== c).length;

    const onTyping = (e) => {
        if (!e.target.value) return reset();
        setTypedText(e.target.value);
    };

    const reset = () => {
        setTypedText('');
    };

    const nextSentence = () => {
        setCountTime((state) => ++state);
        setTypedSentences((state) => [state, curSentence]);
        const goal = { wpm: 100, cpm: 100, acc: accuracy };
        setGoalResults((state) => [...state, goal]);
        reset();

        let next = randomSentence();
        while (typedSentences.includes(next)) {
            next = randomSentence();
        }
        setNexSentence(next);
    };

    const [curKey, setCurKey] = useState([]);
    console.log('on app');
    const onKeyDown = (e) => {
        setCurKey(e.code);
        const isDone = typedText.length >= curSentence[0].length;
        if (!isDone) return;

        const isWongTooMuch = getAccuracy() < 10;
        if (isWongTooMuch) return reset();

        setCurSentence(nexSentence);
        nextSentence();
    };

    const changeTypingModeValue = (value) => {
        setTypingModeValue((state) => ({
            ...state,
            [typingMode]: value,
        }));
    };

    return (
        <Wrapper>
            <main>
                <InfoTable>
                    <KnobSelector
                        className="languages-options"
                        options={{ English: 'ens', Native: 'vn' }}
                        onChange={setLanguages}
                        currentOption={languages}
                    />
                    <KnobSelector
                        className="sentences-options"
                        options={{
                            Sentences: 'sentence',
                            Paragraph: 'paragraph',
                        }}
                        currentOption="sentence"
                    />
                    <GoalResults
                        className="goal-results"
                        results={goalResults}
                    ></GoalResults>
                    <OptionTyping className="typing-options">
                        <Switch
                            options={{ Times: 'times', Minute: 'minute' }}
                            currentOption={typingMode}
                            onChange={setTypingMode}
                        />
                        <ArrowSwitch
                            options={typingModeOptions[typingMode]}
                            currentOption={typingModeValue[typingMode]}
                            onChange={changeTypingModeValue}
                        />
                    </OptionTyping>
                    <Notice className="notice">
                        <RandomSentence data={NOTICES} intervals={5000} />
                        <Clock />
                    </Notice>
                    <TypingEffect curKey={curKey} className="typing-effect" />
                    <BoxResult
                        className="goal-speed"
                        label="Goal speed"
                        value={0}
                    />
                    <BoxResult className="speed" label="Speed" value={0} />
                    <BoxResult
                        className="accuracy"
                        label="Accuracy"
                        value={accuracy}
                    />
                    <BoxResult
                        className="count"
                        label="Count"
                        value={countTimes}
                    />

                    <Author className="author">{curSentence[1]}</Author>
                </InfoTable>
                <TypingArea
                    curSentence={curSentence[0]}
                    nexSentence={nexSentence[0]}
                    typedText={typedText}
                    onChange={onTyping}
                    onKeyDown={onKeyDown}
                />
            </main>
        </Wrapper>
    );
};

export default App;
