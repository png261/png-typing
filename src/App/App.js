import { useEffect, useLayoutEffect, useState } from 'react';
import ArrowSwitch from 'src/components/ArrowSwitch/ArrowSwitch';
import BoxResult from 'src/components/BoxResult/BoxResult';
import Clock from 'src/components/Clock/Clock';
import GoalResults from 'src/components/GoalResults/GoalResults';
import KnobSelector from 'src/components/KnobSelector/KnobSelector';
import PangramSwitch from 'src/components/PangramSwitch/PangramSwitch';
import RandomSentence from 'src/components/RandomSentence/RandomSentence';
import Switch from 'src/components/Switch/Switch';
import TypingArea from 'src/components/TypingArea/TypingArea';
import TypingEffect from 'src/components/TypingEffect/TypingEffect';
import ALL_DATA from 'src/constants/allData';
import NOTICES from 'src/constants/notices';
import MODE_OPTIONS from 'src/constants/typingMode';
import { randomNumber } from 'src/helpers/random';
import { getAccuracy, getCPM, getWPM } from 'src/helpers/typing';
import useCountDown from 'src/hooks/useCountDown';
import useStopWatch from 'src/hooks/useStopWatch';
import { Author, Notice, OptionTyping, Wrapper } from './App.styles';

const App = () => {
    const [languages, setLanguages] = useState('ens');
    const [typingLength, setTypingLength] = useState('sentences');

    const getSentences = () => {
        const DATA = ALL_DATA[typingLength][languages];
        if (typingLength === 'paragraph') {
            return DATA[randomNumber(DATA.length)];
        }
        return DATA;
    };

    const [sentences, setSentences] = useState(getSentences);

    const [currentIndex, setCurrentIndex] = useState(
        randomNumber(sentences.length)
    );
    const [typedIndexes, setTypedIndexes] = useState([currentIndex]);
    const randomNextIndex = () => {
        const num = randomNumber(sentences.length);
        return typedIndexes.includes(num) ? randomNextIndex() : num;
    };
    const [nextIndex, setNextIndex] = useState(randomNextIndex);

    const [mode, setMode] = useState('times');
    const [modeValue, setModeValue] = useState({
        times: 5,
        minute: '01:00',
    });
    const stopWatch = useStopWatch();
    const countDown = useCountDown(modeValue.minute.split(':')[0] * 60000);

    const [countTimes, setCountTime] = useState(0);
    const [accuracy, setAccuracy] = useState(0);
    const [goalCPM, setGoalCPM] = useState(0);
    const [CPM, setCPM] = useState(0);
    const [goalResults, setGoalResults] = useState([]);
    const [typedText, setTypedText] = useState('');

    const [currentSentence, currentAuthor] = sentences[currentIndex] || [
        'A',
        'B',
    ];
    const [nextSentence] = sentences[nextIndex] || ['A', 'B'];

    const reset = () => {
        stopWatch.stopCount();
        setTypedText('');
    };
    const onTyping = ({ target: { value } }) => {
        setTypedText(value);
    };
    const changeModeValue = (value) => {
        setModeValue((prevState) => ({
            ...prevState,
            [mode]: value,
        }));
    };
    const updateResult = () => {
        setCountTime((prevState) => ++prevState);
        const goal = {
            wpm: getWPM(typedText, currentSentence, stopWatch.timer),
            cpm: CPM,
            acc: accuracy,
        };
        setGoalResults((prevState) => [...prevState, goal]);
        setGoalCPM((prevState) => Math.max(prevState, CPM));

        reset();

        if (typingLength !== 'paragraph') {
            return setNextIndex(randomNextIndex());
        }

        if (nextIndex === sentences.length) {
            return setNextIndex(0);
        }
        return setNextIndex((prevState) => ++prevState);
    };
    const onKeyDown = () => {
        if (typedText.length === 1 && !stopWatch.isCounting) {
            stopWatch.startCount();
            if (mode === 'minute') {
                countDown.startCount();
            }
        }

        const isDone = typedText.length >= currentSentence.length;
        if (!isDone) return;

        setCurrentIndex(nextIndex);
        updateResult();
    };
    const turnOnPangram = () => {
        setTypingLength('sentences');
        setLanguages('pangram');
    };
    const turnOffPangram = () => {
        setTypingLength('sentences');
        setLanguages('ens');
    };

    useLayoutEffect(() => {
        setSentences(getSentences());
        return () => {
            setSentences([]);
        };
    }, [typingLength, languages]);

    useLayoutEffect(() => {
        function updateSentences() {
            if (typingLength === 'paragraph') {
                setCurrentIndex(0);
                setNextIndex(1);
                return;
            }
            setCurrentIndex(randomNumber(sentences.length));
            setNextIndex(randomNumber(sentences.length));
        }
        updateSentences();
        return reset;
    }, [sentences]);

    useEffect(() => {
        setTypedIndexes((prevState) => [...prevState, currentIndex]);
    }, [currentIndex]);

    useEffect(() => {
        if (typedText.length === 0) reset();
        setAccuracy(getAccuracy(typedText, currentSentence));
    }, [typedText]);

    useLayoutEffect(() => {
        setCPM(getCPM(typedText, stopWatch.timer));
    }, [stopWatch.timer]);

    return (
        <Wrapper>
            <main>
                <div className="languages-options">
                    <KnobSelector
                        options={{ English: 'ens', Vietnamese: 'vn' }}
                        onChange={setLanguages}
                        currentOption={languages}
                    />
                </div>
                <div className="sentences-options">
                    <KnobSelector
                        options={{
                            Sentences: 'sentences',
                            Paragraph: 'paragraph',
                        }}
                        onChange={setTypingLength}
                        currentOption={typingLength}
                    />
                </div>
                <div className="goal-results">
                    <GoalResults results={goalResults} />
                </div>
                <div className="typing-options">
                    <OptionTyping>
                        <Switch
                            options={{ Times: 'times', Minute: 'minute' }}
                            currentOption={mode}
                            onChange={setMode}
                        />
                        <ArrowSwitch
                            options={MODE_OPTIONS[mode]}
                            currentOption={modeValue[mode]}
                            onChange={changeModeValue}
                            value={
                                mode === 'minute' &&
                                countDown.isCounting &&
                                `${countDown.minutes}:${countDown.seconds}`
                            }
                        />
                    </OptionTyping>
                </div>
                <div className="notice">
                    <Notice>
                        <RandomSentence data={NOTICES} intervals={5000} />
                        <Clock />
                    </Notice>
                </div>
                <div className="typing-effect">
                    <TypingEffect />
                </div>
                <div className="pangram">
                    <PangramSwitch
                        label="Pangram"
                        onActive={turnOnPangram}
                        onOff={turnOffPangram}
                        isActive={languages === 'pangram'}
                    />
                </div>
                <div className="goal-speed">
                    <BoxResult
                        label="Goal speed"
                        value={goalCPM}
                        textLeft={true}
                    />
                </div>
                <div className="speed">
                    <BoxResult
                        label="Speed"
                        value={CPM}
                        isHighLight={CPM > 400}
                    />
                </div>
                <div className="accuracy">
                    <BoxResult label="Accuracy" value={accuracy} />
                </div>
                <div className="count">
                    <BoxResult label="Count" value={countTimes} />
                </div>
                <div className="author">
                    <Author>{currentAuthor}</Author>
                </div>
                <div className="typing-area">
                    <TypingArea
                        currentSentence={currentSentence}
                        nextSentence={nextSentence}
                        typedText={typedText}
                        onChange={onTyping}
                        onKeyDown={onKeyDown}
                        CPM={CPM}
                    />
                </div>
            </main>
        </Wrapper>
    );
};

export default App;
